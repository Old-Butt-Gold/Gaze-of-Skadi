using System.Text.Json;
using System.Web;

namespace OpenDota.Utilities;

/// <summary>
/// Used for sending http requests
/// </summary>
public sealed class Requester : IDisposable
{
	private const string OpenDotaApi = "https://api.opendota.com/api/";
	private const int DefaultTimeoutSeconds = 60;

	private readonly HttpClient _httpClient;
	private readonly HttpClientHandler _httpClientHandler;
	private readonly OpenDotaSettings _openDotaSettings;

	/// <summary>
	/// Initializes a new instance of the <see cref="Requester"/> class.
	/// </summary>
	public Requester(OpenDotaSettings settings)
	{
		_openDotaSettings = settings;

		_httpClientHandler = new HttpClientHandler();

		_httpClient = new HttpClient(_httpClientHandler)
		{
			Timeout = TimeSpan.FromSeconds(DefaultTimeoutSeconds),
			BaseAddress = new Uri(OpenDotaApi),
		};
	}

	internal async Task<T?> GetResponseAsync<T>(string url, ICollection<KeyValuePair<string, string>>? parameters = null) where T : class?
	{
		var response = await GetRequestResponseMessageAsync(url, parameters);

		response.EnsureSuccessStatusCode();

		var textResponse = await response.Content.ReadAsStringAsync();

		return string.IsNullOrEmpty(textResponse)
			? null
			: JsonSerializer.Deserialize<T>(textResponse, _openDotaSettings.JsonSerializerOptions);
	}

	internal Task<HttpResponseMessage> PostRequestAsync(string url, HttpContent? content = null) => _httpClient.PostAsync(url, content);

	/// <summary>
	/// Releases unmanaged and - optionally - managed resources.
	/// </summary>
	public void Dispose()
	{
		_httpClient.Dispose();
		_httpClientHandler.Dispose();
	}

	private Task<HttpResponseMessage> GetRequestResponseMessageAsync(string url,
		ICollection<KeyValuePair<string, string>>? parameters = null)
	{
		var queryParams = parameters ?? [];

		if (!string.IsNullOrEmpty(_openDotaSettings.ApiKey))
		{
			queryParams.Add(new KeyValuePair<string, string>("api_key", _openDotaSettings.ApiKey));
		}

		var uriBuilder = new UriBuilder(new Uri(_httpClient.BaseAddress!, url))
		{
			Query = BuildQueryString(queryParams),
		};

		return _httpClient.GetAsync(uriBuilder.Uri);
	}

	private static string BuildQueryString(IEnumerable<KeyValuePair<string, string>> parameters)
	{
		return string.Join("&", parameters
			.Where(kvp => !string.IsNullOrEmpty(kvp.Key))
			.Select(kvp =>
				$"{HttpUtility.UrlEncode(kvp.Key)}={HttpUtility.UrlEncode(kvp.Value)}"));
	}
}
