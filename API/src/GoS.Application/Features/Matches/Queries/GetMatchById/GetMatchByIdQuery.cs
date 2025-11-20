using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Domain.Matches.Models;

namespace GoS.Application.Features.Matches.Queries.GetMatchById;

internal sealed record GetMatchByIdQuery(long MatchId) : ICacheableQuery<Match?>
{
    public string GetCacheKey() => CacheKey.Create("match", new { id = MatchId });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(1);
    public TimeSpan? GetSlidingExpiration() => null;
}
