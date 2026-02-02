using GoS.Application.Abstractions.Queries;

namespace GoS.Application.Features.Steam.Queries.GetSteamNews;

public record GetSteamNewsQuery(int Count) : ICacheableQuery<IEnumerable<SteamNewsDto>>
{
    public string GetCacheKey() => $"steam:news:count={Count}";

    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(5);

    public TimeSpan? GetSlidingExpiration() => null;
}
