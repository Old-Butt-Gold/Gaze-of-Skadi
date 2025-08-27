using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.EndpointParameters;
using GoS.Application.Features.Players.Common.Interfaces;
using GoS.Domain.Players.Models;

namespace GoS.Application.Features.Players.Queries.GetPlayerRecentMatches;

public record GetPlayerRecentMatchesQuery(long AccountId, PlayerEndpointParameters Parameters)
    : ICacheableQuery<IEnumerable<PlayerMatch>?>, IPlayerEndpointParametersRequest
{
    public string GetCacheKey() => CacheKey.Create("player:recent", new { accountId = AccountId, p = Parameters });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(5);
    public TimeSpan? GetSlidingExpiration() => null;
}
