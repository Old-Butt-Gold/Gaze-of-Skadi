using System.Net;
using System.Net.Http.Headers;
using System.Text.Json;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace GoS.Infrastructure.Requester;

internal sealed class HttpRequester : IRequester
{
    private readonly HttpClient _httpClient;
    private readonly IOptionsMonitor<HttpRequesterOptions> _optionsMonitor;
    private readonly ISerializationOptionsProvider _serializationOptionsProvider;
    private readonly ILogger<HttpRequester> _logger;

    public HttpRequester(HttpClient httpClient, IOptionsMonitor<HttpRequesterOptions> optionsMonitor,
        ISerializationOptionsProvider serializationOptionsProvider, ILogger<HttpRequester> logger)
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

            request.Headers.AcceptEncoding.Clear();
            request.Headers.AcceptEncoding.Add(new StringWithQualityHeaderValue("gzip"));
            request.Headers.AcceptEncoding.Add(new StringWithQualityHeaderValue("deflate"));
            request.Headers.AcceptEncoding.Add(new StringWithQualityHeaderValue("br"));
            request.Headers.Accept.Add(new("*/*"));
            request.Headers.Add("origin", "https://www.opendota.com");
            request.Headers.Add("referer", "https://www.opendota.com");

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
            _logger.LogWarning(ex.Message, "Request to {Url} timed out after {TimeoutSeconds}s.", url, _httpClient.Timeout.TotalSeconds);
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
                case HttpStatusCode.NotFound:
                    _logger.LogWarning("Resource not found: {Url}", requestUri);
                    throw new KeyNotFoundException(message);

                case HttpStatusCode.Unauthorized:
                case HttpStatusCode.Forbidden:
                    _logger.LogWarning("Unauthorized/Forbidden when requesting {Url}", requestUri);
                    throw new UnauthorizedAccessException(message);

                case HttpStatusCode.BadRequest:
                    _logger.LogWarning("Bad request from upstream: {Url}", requestUri);
                    throw new HttpRequestException(message);

                case HttpStatusCode.Conflict:
                    _logger.LogWarning("Conflict returned from upstream: {Url}", requestUri);
                    throw new HttpRequestException(message);
                default:
                    _logger.LogWarning("Upstream returned non-success status {Status} for {Url}", (int)response.StatusCode, requestUri);
                    throw new HttpRequestException(message);
            }
        }

    }

    public Task<HttpResponseMessage> PostRequestAsync(string url, HttpContent? content = null, CancellationToken cancellationToken = default)
    {
        var requestUri = BuildUri(url, null);
        var request = new HttpRequestMessage(HttpMethod.Post, requestUri) { Content = content };
        return _httpClient.SendAsync(request, cancellationToken);
    }

    private Uri BuildUri(string url, IEnumerable<KeyValuePair<string, string>>? parameters)
    {
        var paramList = parameters != null
            ? new List<KeyValuePair<string, string>>(parameters)
            : [];

        var opts = _optionsMonitor.CurrentValue;
        if (!string.IsNullOrWhiteSpace(opts.ApiKey))
        {
            paramList.Add(new KeyValuePair<string, string>("api_key", opts.ApiKey));
        }

        if (_httpClient.BaseAddress is null)
            throw new InvalidOperationException("HttpClient.BaseAddress is not configured.");

        var uriBuilder = new UriBuilder(new Uri(_httpClient.BaseAddress!, url))
        {
            Query = BuildQueryString(paramList)
        };

        return uriBuilder.Uri;
    }

    private static string BuildQueryString(IEnumerable<KeyValuePair<string, string>> parameters)
    {
        var pairs = parameters
            .Where(kvp => !string.IsNullOrWhiteSpace(kvp.Key))
            .Select(kvp => $"{Uri.EscapeDataString(kvp.Key)}={Uri.EscapeDataString(kvp.Value)}");

        return string.Join("&", pairs);
    }
}
