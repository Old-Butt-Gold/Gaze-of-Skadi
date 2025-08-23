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

    public async Task<T?> GetResponseAsync<T>(string url, ICollection<KeyValuePair<string, string>>? parameters = null, CancellationToken ct = default) where T : class?
    {
        try
        {
            var requestUri = BuildUri(url, parameters);
            using var request = new HttpRequestMessage(HttpMethod.Get, requestUri);

            using var response = await _httpClient.SendAsync(request, ct);

            response.EnsureSuccessStatusCode();

            await using var stream = await response.Content.ReadAsStreamAsync(ct);

            var options = _serializationOptionsProvider.CreateJsonSerializerOptions();
            return await JsonSerializer.DeserializeAsync<T>(stream, options, ct);
        }
        catch (OperationCanceledException) when (ct.IsCancellationRequested)
        {
            _logger.LogDebug("Request to {Url} was canceled by caller.", url);
            throw;
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