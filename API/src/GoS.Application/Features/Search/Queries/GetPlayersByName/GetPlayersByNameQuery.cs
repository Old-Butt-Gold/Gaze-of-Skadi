using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Domain.Search.Models;

namespace GoS.Application.Features.Search.Queries.GetPlayersByName;

public record GetPlayersByNameQuery(string PersonaName) : ICacheableQuery<IEnumerable<PlayerResponse>?>
{
    public string GetCacheKey() => CacheKey.Create("search:players", new { q = PersonaName?.Trim()?.ToLowerInvariant() });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromSeconds(30);
    public TimeSpan? GetSlidingExpiration() => null;
}
