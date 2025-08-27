using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.EndpointParameters;
using GoS.Application.Features.Players.Common.Interfaces;
using GoS.Domain.Players.Models;

namespace GoS.Application.Features.Players.Queries.GetPlayerCounts;

public record GetPlayerCountsQuery(long AccountId, PlayerEndpointParameters Parameters)
    : ICacheableQuery<PlayerCount?>, IPlayerEndpointParametersRequest
{
    public string GetCacheKey() => CacheKey.Create("player:counts", new { accountId = AccountId, p = Parameters });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(20);
    public TimeSpan? GetSlidingExpiration() => null;
}
