using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.EndpointParameters;
using GoS.Application.Features.Players.Common.Interfaces;

namespace GoS.Application.Features.Players.Queries.GetPlayerWordCloud;

public record GetPlayerWordCloudQuery(long AccountId, PlayerEndpointParameters Parameters)
    : ICacheableQuery<PlayerWordCloudDto?>, IPlayerEndpointParametersRequest
{
    public string GetCacheKey() => CacheKey.Create("player:wordcloud", new { accountId = AccountId, p = Parameters });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(30);
    public TimeSpan? GetSlidingExpiration() => null;
}
