using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.EndpointParameters;
using GoS.Application.Features.Players.Common.Interfaces;
using GoS.Domain.Players.Models;

namespace GoS.Application.Features.Players.Queries.GetPlayerPeers;

public record GetPlayerPeersQuery(long AccountId, PlayerEndpointParameters Parameters)
    : ICacheableQuery<IEnumerable<PlayerPeer>?>, IPlayerEndpointParametersRequest
{
    public string GetCacheKey() => CacheKey.Create("player:peers", new { accountId = AccountId, p = Parameters });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(10);
    public TimeSpan? GetSlidingExpiration() => null;
}
