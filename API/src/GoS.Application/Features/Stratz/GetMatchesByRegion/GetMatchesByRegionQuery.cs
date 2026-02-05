using GoS.Application.Abstractions.Queries;

namespace GoS.Application.Features.Stratz.GetMatchesByRegion;

public sealed record GetMatchesByRegionQuery(int Take = 240) : ICacheableQuery<MatchesByRegionDto?>
{
    public string GetCacheKey() => $"stratz:matches-by-region:{Take}";

    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(24);

    public TimeSpan? GetSlidingExpiration() => null;
}
