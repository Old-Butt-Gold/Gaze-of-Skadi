using System.Net;
using System.Text.Json;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace GoS.Infrastructure.Requester;

internal sealed class OpenDotaRequester : IOpenDotaRequester
{
    private readonly HttpClient _httpClient;
    private readonly IOptionsMonitor<OpenDotaHttpRequesterOptions> _optionsMonitor;
    private readonly ISerializationOptionsProvider _serializationOptionsProvider;
    private readonly ILogger<OpenDotaRequester> _logger;

    public OpenDotaRequester(HttpClient httpClient, 
        IOptionsMonitor<OpenDotaHttpRequesterOptions> optionsMonitor,
        ISerializationOptionsProvider serializationOptionsProvider,
        ILogger<OpenDotaRequester> logger)
    {
        _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
        _optionsMonitor = optionsMonitor ?? throw new ArgumentNullException(nameof(optionsMonitor));
        _serializationOptionsProvider = serializationOptionsProvider ?? throw new ArgumentNullException(nameof(serializationOptionsProvider));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public Task<T?> GetResponseAsync<T>(string url, IEnumerable<KeyValuePair<string, string>>? parameters = null, CancellationToken ct = default)
        where T : class?
    {
        var request = new HttpRequestMessage(HttpMethod.Get, BuildUri(url, parameters));
        return SendAsync<T>(request, url, ct);
    }

    public Task<T?> PostRequestAsync<T>(string url, IEnumerable<KeyValuePair<string, string>>? parameters = null, HttpContent? content = null, CancellationToken ct = default)
        where T : class?
    {
        var request = new HttpRequestMessage(HttpMethod.Post, BuildUri(url, parameters)) { Content = content };
        return SendAsync<T>(request, url, ct);
    }

    private async Task<T?> SendAsync<T>(HttpRequestMessage request, string url, CancellationToken ct)
        where T : class?
    {
        using (request)
        {
            try
            {
                using var response = await _httpClient.SendAsync(request, HttpCompletionOption.ResponseContentRead, ct);

                EnsureSuccessCode(response, request.RequestUri!);

                await using var stream = await response.Content.ReadAsStreamAsync(ct);

                if (stream is null or { CanSeek: true, Length: 0 })
                    return null;

                var options = _serializationOptionsProvider.CreateJsonSerializerOptions();
                return await JsonSerializer.DeserializeAsync<T>(stream, options, ct);
            }
            catch (OperationCanceledException) when (ct.IsCancellationRequested)
            {
                _logger.LogDebug("Request to {Url} was canceled by caller.", url);
                throw;
            }
            catch (OperationCanceledException ex)
            {
                _logger.LogWarning(ex, "Request to {Url} timed out.", url);
                throw new TimeoutException($"Request to '{url}' timed out.", ex);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogWarning(ex, "HTTP request failed for {Url}.", url);
                throw;
            }
            catch (JsonException ex)
            {
                _logger.LogError(ex, "Failed to deserialize response for {Url}.", url);
                throw;
            }
        }
    }

    private void EnsureSuccessCode(HttpResponseMessage response, Uri requestUri)
    {
        if (response.IsSuccessStatusCode)
            return;

        var message = $"Upstream request to '{requestUri}' returned {(int)response.StatusCode} {response.StatusCode}";

        switch (response.StatusCode)
        {
            case HttpStatusCode.NotFound:
                _logger.LogWarning("Resource not found: {Url}", requestUri);
                throw new KeyNotFoundException(message);
            case HttpStatusCode.Unauthorized:
            case HttpStatusCode.Forbidden:
                _logger.LogWarning("Unauthorized/Forbidden when requesting {Url}", requestUri);
                throw new UnauthorizedAccessException(message);
            case HttpStatusCode.BadRequest:
                _logger.LogWarning("Bad request from upstream: {Url}", requestUri);
                throw new HttpRequestException(message, null, response.StatusCode);
            case HttpStatusCode.Conflict:
                _logger.LogWarning("Conflict returned from upstream: {Url}", requestUri);
                throw new HttpRequestException(message, null, response.StatusCode);
            default:
                _logger.LogWarning("Upstream returned non-success status {Status} for {Url}", (int)response.StatusCode, requestUri);
                throw new HttpRequestException(message, null, response.StatusCode);
        }
    }

    private Uri BuildUri(string url, IEnumerable<KeyValuePair<string, string>>? parameters)
    {
        if (_httpClient.BaseAddress is null)
            throw new InvalidOperationException("HttpClient.BaseAddress is not configured.");

        var paramList = parameters != null
            ? new List<KeyValuePair<string, string>>(parameters)
            : [];

        var apiKey = _optionsMonitor.CurrentValue.ApiKey;
        if (!string.IsNullOrWhiteSpace(apiKey))
            paramList.Add(new KeyValuePair<string, string>("api_key", apiKey));

        var uriBuilder = new UriBuilder(new Uri(_httpClient.BaseAddress, url))
        {
            Query = BuildQueryString(paramList)
        };

        return uriBuilder.Uri;
    }

    private static string BuildQueryString(IEnumerable<KeyValuePair<string, string>> parameters)
    {
        var pairs = parameters
            .Where(kvp => !string.IsNullOrWhiteSpace(kvp.Key) && !string.IsNullOrWhiteSpace(kvp.Value))
            .Select(kvp => $"{Uri.EscapeDataString(kvp.Key)}={Uri.EscapeDataString(kvp.Value)}");

        return string.Join("&", pairs);
    }
}
