using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Domain.Players.Models;

namespace GoS.Application.Features.Players.Queries.GetPlayerHeroRankings;

public record GetPlayerHeroRankingsQuery(long AccountId) : ICacheableQuery<IEnumerable<PlayerHeroRanking>?>
{
    public string GetCacheKey() => CacheKey.Create("player:heroRankings", new { accountId = AccountId });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(30);
    public TimeSpan? GetSlidingExpiration() => null;
}
