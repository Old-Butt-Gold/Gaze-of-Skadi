using System.Net.Http.Headers;
using System.Text.Json;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace GoS.Infrastructure.StratzRequester;

public class StratzHttpRequester : IStratzRequester
{
    private readonly HttpClient _httpClient;
    private readonly IOptionsMonitor<StratzHttpRequesterOptions> _optionsMonitor;
    private readonly ISerializationOptionsProvider _serializationOptionsProvider;
    private readonly ILogger<StratzHttpRequester> _logger;

    public StratzHttpRequester(
        HttpClient httpClient, IOptionsMonitor<StratzHttpRequesterOptions> optionsMonitor, ISerializationOptionsProvider serializationOptionsProvider, ILogger<StratzHttpRequester> logger)
    {
        _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
        _optionsMonitor = optionsMonitor ?? throw new ArgumentNullException(nameof(optionsMonitor));
        _serializationOptionsProvider = serializationOptionsProvider ?? throw new ArgumentNullException(nameof(serializationOptionsProvider));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<T?> GetResponseAsync<T>(string url, IEnumerable<KeyValuePair<string, string>>? parameters = null, CancellationToken ct = default) where T : class?
    {
        try
        {
            var requestUri = BuildUri(url, parameters);
            using var request = new HttpRequestMessage(HttpMethod.Get, requestUri);

            var opts = _optionsMonitor.CurrentValue;

            if (!string.IsNullOrEmpty(opts.ApiKey))
            {
                request.Headers.Authorization = new AuthenticationHeaderValue(opts.ApiKey);
            }

            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            request.Headers.UserAgent.ParseAdd("STRATZ_API");

            using var response = await _httpClient.SendAsync(request, HttpCompletionOption.ResponseContentRead, ct);

            EnsureSuccessCode(response, request.RequestUri!);

            await using var stream = await response.Content.ReadAsStreamAsync(ct);

            if (stream is null or { CanSeek: true, Length: 0 })
            {
                return null;
            }

            var options = _serializationOptionsProvider.CreateJsonSerializerOptions();
            return await JsonSerializer.DeserializeAsync<T>(stream, options, ct);
        }
        catch (OperationCanceledException) when (ct.IsCancellationRequested)
        {
            _logger.LogDebug("Request to {Url} was canceled by caller.", url);
            throw;
        }
        catch (TaskCanceledException ex) when (!ct.IsCancellationRequested)
        {
            _logger.LogWarning(ex, "Request to {Url} timed out after {TimeoutSeconds}s.", url, _httpClient.Timeout.TotalSeconds);
            throw new TimeoutException($"Request to '{url}' timed out after {_httpClient.Timeout.TotalSeconds} seconds.", ex);
        }
        catch (HttpRequestException ex)
        {
            _logger.LogWarning(ex, "HTTP request failed for {Url}", url);
            throw;
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex, "Failed to deserialize response for {Url}", url);
            throw;
        }
    }

    private void EnsureSuccessCode(HttpResponseMessage response, Uri requestUri)
    {
        if (!response.IsSuccessStatusCode)
        {
            var message = $"Upstream request to '{requestUri}' returned {(int)response.StatusCode} {response.StatusCode}";

            switch (response.StatusCode)
            {
                case System.Net.HttpStatusCode.NotFound:
                    _logger.LogWarning("Resource not found: {Url}", requestUri);
                    throw new KeyNotFoundException(message);

                case System.Net.HttpStatusCode.Unauthorized:
                case System.Net.HttpStatusCode.Forbidden:
                    _logger.LogWarning("Unauthorized/Forbidden when requesting {Url}", requestUri);
                    throw new UnauthorizedAccessException(message);

                case System.Net.HttpStatusCode.BadRequest:
                    _logger.LogWarning("Bad request from upstream: {Url}", requestUri);
                    throw new HttpRequestException(message);

                case System.Net.HttpStatusCode.Conflict:
                    _logger.LogWarning("Conflict returned from upstream: {Url}", requestUri);
                    throw new HttpRequestException(message);

                default:
                    _logger.LogWarning("Upstream returned non-success status {Status} for {Url}", (int)response.StatusCode, requestUri);
                    throw new HttpRequestException(message);
            }
        }
    }

    public async Task<T?> PostRequestAsync<T>(string url, HttpContent? content = null, CancellationToken ct = default) where T : class?
    {
        try
        {
            var requestUri = BuildUri(url, null);
            using var request = new HttpRequestMessage(HttpMethod.Post, requestUri);
            request.Content = content;

            var opts = _optionsMonitor.CurrentValue;

            if (!string.IsNullOrEmpty(opts.ApiKey))
            {
                request.Headers.Add("Authorization", $"Bearer {opts.ApiKey}");
            }

            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("*/*"));
            request.Headers.UserAgent.Clear();
            request.Headers.UserAgent.ParseAdd("STRATZ_API");

            using var response = await _httpClient.SendAsync(request, HttpCompletionOption.ResponseContentRead, ct);

            EnsureSuccessCode(response, request.RequestUri!);

            await using var stream = await response.Content.ReadAsStreamAsync(ct);

            if (stream is null or { CanSeek: true, Length: 0 })
            {
                return null;
            }

            var options = _serializationOptionsProvider.CreateJsonSerializerOptions();
            return await JsonSerializer.DeserializeAsync<T>(stream, options, ct);
        }
        catch (OperationCanceledException) when (ct.IsCancellationRequested)
        {
            _logger.LogDebug("Request to {Url} was canceled by caller.", url);
            throw;
        }
        catch (TaskCanceledException ex) when (!ct.IsCancellationRequested)
        {
            _logger.LogWarning(ex, "Request to {Url} timed out after {TimeoutSeconds}s.", url, _httpClient.Timeout.TotalSeconds);
            throw new TimeoutException($"Request to '{url}' timed out after {_httpClient.Timeout.TotalSeconds} seconds.", ex);
        }
        catch (HttpRequestException ex)
        {
            _logger.LogWarning(ex, "HTTP request failed for {Url}", url);
            throw;
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex, "Failed to deserialize response for {Url}", url);
            throw;
        }
    }

    private Uri BuildUri(string url, IEnumerable<KeyValuePair<string, string>>? parameters)
    {
        var paramList = parameters != null
            ? new List<KeyValuePair<string, string>>(parameters)
            : [];

        if (_httpClient.BaseAddress is null)
            throw new InvalidOperationException("HttpClient.BaseAddress is not configured.");

        var uriBuilder = new UriBuilder(new Uri(_httpClient.BaseAddress!, url.Trim()))
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
