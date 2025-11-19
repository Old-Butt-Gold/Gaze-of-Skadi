using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;

namespace GoS.Application.Features.Search.Queries.GetPlayersByName;

public record GetPlayersByNameQuery(string PersonaName) : ICacheableQuery<IEnumerable<PlayerResponseDto>?>
{
    public string GetCacheKey() => CacheKey.Create("search:players", new { q = PersonaName.Trim().ToLowerInvariant() });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromSeconds(30);
    public TimeSpan? GetSlidingExpiration() => null;
}
