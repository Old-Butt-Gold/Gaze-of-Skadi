using GoS.Application.Abstractions.Queries;

namespace GoS.Application.Features.Stratz.GetMatchesByRank;

public sealed record GetMatchesByRankQuery(int Take = 240) : ICacheableQuery<MatchesByRankDto?>
{
    public string GetCacheKey() => $"stratz:matches-by-rank:{Take}";

    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(24);

    public TimeSpan? GetSlidingExpiration() => null;
}
