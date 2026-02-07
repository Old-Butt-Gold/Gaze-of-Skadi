using GoS.Application.Abstractions.Queries;

namespace GoS.Application.Features.Stratz.GetMatchesByGameMode;

public sealed record GetMatchesByGameModeQuery(int Take = 240) : ICacheableQuery<MatchesByGameModeDto?>
{
    public string GetCacheKey() => $"stratz:matches-by-game-mode:{Take}";

    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(24);

    public TimeSpan? GetSlidingExpiration() => null;
}

