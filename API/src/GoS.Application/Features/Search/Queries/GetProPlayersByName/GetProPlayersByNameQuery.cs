using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Domain.Search.Models;

namespace GoS.Application.Features.Search.Queries.GetProPlayersByName;

public record GetProPlayersByNameQuery(string? Name) : ICacheableQuery<IEnumerable<ProPlayer>?>
{
    public string GetCacheKey() => CacheKey.Create("search:proPlayersByName", new { q = Name?.Trim()?.ToLowerInvariant() });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(10);
    public TimeSpan? GetSlidingExpiration() => null;
}
