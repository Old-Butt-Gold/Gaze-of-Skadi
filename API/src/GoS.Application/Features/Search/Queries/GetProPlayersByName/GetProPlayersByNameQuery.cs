using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;

namespace GoS.Application.Features.Search.Queries.GetProPlayersByName;

public record GetProPlayersByNameQuery(string? Name) : ICacheableQuery<IEnumerable<ProPlayerDto>?>
{
    public string GetCacheKey() => CacheKey.Create("search:proPlayersByName", new { q = Name?.Trim().ToLowerInvariant() });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(10);
    public TimeSpan? GetSlidingExpiration() => null;
}
