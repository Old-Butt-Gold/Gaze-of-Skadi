using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;

namespace GoS.Application.Features.Players.Queries.GetPlayerHeroRankings;

public record GetPlayerHeroRankingsQuery(long AccountId) : ICacheableQuery<IEnumerable<PlayerHeroRankingDto>?>
{
    public string GetCacheKey() => CacheKey.Create("player:heroRankings", new { accountId = AccountId });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(30);
    public TimeSpan? GetSlidingExpiration() => null;
}
