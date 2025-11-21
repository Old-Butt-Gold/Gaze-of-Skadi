using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.EndpointParameters;
using GoS.Application.Features.Players.Common.Interfaces;

namespace GoS.Application.Features.Players.Queries.GetPlayerPros;

public record GetPlayerProsQuery(long AccountId, PlayerEndpointParameters Parameters)
    : ICacheableQuery<IEnumerable<PlayerProDto>?>, IPlayerEndpointParametersRequest
{
    public string GetCacheKey() => CacheKey.Create("player:pros", new { accountId = AccountId, p = Parameters });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(60);
    public TimeSpan? GetSlidingExpiration() => null;
}
