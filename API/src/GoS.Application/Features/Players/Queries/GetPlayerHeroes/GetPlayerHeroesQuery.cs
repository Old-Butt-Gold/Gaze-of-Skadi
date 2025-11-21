using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.EndpointParameters;
using GoS.Application.Features.Players.Common.Interfaces;

namespace GoS.Application.Features.Players.Queries.GetPlayerHeroes;

public record GetPlayerHeroesQuery(long AccountId, PlayerEndpointParameters Parameters)
    : ICacheableQuery<IEnumerable<PlayerHeroDto>?>, IPlayerEndpointParametersRequest
{
    public string GetCacheKey() => CacheKey.Create("player:heroes", new { accountId = AccountId, p = Parameters });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(20);
    public TimeSpan? GetSlidingExpiration() => null;
}
