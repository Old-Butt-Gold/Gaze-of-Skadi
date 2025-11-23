using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.EndpointParameters;
using GoS.Application.Features.Players.Common.Interfaces;
using GoS.Application.Features.Players.Queries.GetPlayerMatches;

namespace GoS.Application.Features.Players.Queries.GetPlayerActivity;

public record GetPlayerActivityQuery(long AccountId, PlayerEndpointParameters Parameters) :
    ICacheableQuery<Dictionary<DateOnly, IEnumerable<PlayerMatchDto>>?>, IPlayerEndpointParametersRequest
{
    public string GetCacheKey() => CacheKey.Create("player:activity", new { accountId = AccountId });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(60);
    public TimeSpan? GetSlidingExpiration() => null;
}
