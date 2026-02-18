using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;

namespace GoS.Application.Features.Search.Queries.GetProMatches;

public record GetProMatchesQuery(long? LessThanMatchId) : ICacheableQuery<IEnumerable<ProMatchDto>?>
{
    public string GetCacheKey() => CacheKey.Create("matches:pro", new { lessThan = LessThanMatchId });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(2);
    public TimeSpan? GetSlidingExpiration() => null;
}
