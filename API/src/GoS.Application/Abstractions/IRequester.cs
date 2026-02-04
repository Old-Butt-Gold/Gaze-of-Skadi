using GoS.Application.Options;

namespace GoS.Application.Abstractions;

public interface IRequester<TOptions> where TOptions : class
{
    public Task<T?> GetResponseAsync<T>(string url, IEnumerable<KeyValuePair<string, string>>? parameters = null, CancellationToken ct = default)
        where T : class?;

    public Task<T?> PostRequestAsync<T>(string url, HttpContent? content = null, CancellationToken ct = default) where T : class?;
}

public interface IOpenDotaRequester : IRequester<OpenDotaHttpRequesterOptions>;

public interface ISteamRequester : IRequester<SteamHttpRequesterOptions>;

public interface IStratzRequester : IRequester<StratzHttpRequesterOptions>;
