using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;

namespace GoS.Application.Features.Matches.Queries.FindMatches;

public record FindMatchesQuery(int[] TeamA, int[] TeamB) : ICacheableQuery<IEnumerable<MatchFindDto>?>
{
    public string GetCacheKey() => CacheKey.Create("match", new { TeamA, TeamB });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(1);
    public TimeSpan? GetSlidingExpiration() => null;
}
