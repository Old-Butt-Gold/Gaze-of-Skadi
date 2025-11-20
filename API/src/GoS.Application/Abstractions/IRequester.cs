namespace GoS.Application.Abstractions;

public interface IRequester
{
    public Task<T?> GetResponseAsync<T>(string url, IEnumerable<KeyValuePair<string, string>>? parameters = null, CancellationToken ct = default)
        where T : class?;

    public Task<HttpResponseMessage> PostRequestAsync(string url, HttpContent? content = null, CancellationToken ct = default);
}
