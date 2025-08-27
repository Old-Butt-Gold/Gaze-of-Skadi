using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Domain.Matches.Models;

namespace GoS.Application.Features.Matches.Queries.GetProMatches;

public record GetProMatchesQuery(long? LessThanMatchId) : ICacheableQuery<IEnumerable<ProMatch>?>
{
    public string GetCacheKey() => CacheKey.Create("matches:pro", new { lessThan = LessThanMatchId });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(2);
    public TimeSpan? GetSlidingExpiration() => null;
}
