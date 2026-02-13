using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.EndpointParameters;
using GoS.Application.Features.Players.Common.Interfaces;

namespace GoS.Application.Features.Players.Queries.GetPlayerActivity;

public record GetPlayerActivityQuery(long AccountId, PlayerEndpointParameters Parameters, int? TimezoneOffsetHours = null)
    : ICacheableQuery<PlayerActivityDto?>, IPlayerEndpointParametersRequest
{
    public string GetCacheKey() => CacheKey.Create("player:activity", new
    {
        accountId = AccountId,
        tz = TimezoneOffsetHours ?? 0
    });

    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(60);
    public TimeSpan? GetSlidingExpiration() => null;
}
