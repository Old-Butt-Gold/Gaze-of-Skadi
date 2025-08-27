using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.EndpointParameters;
using GoS.Application.Features.Players.Common.Interfaces;
using GoS.Domain.Players.Models;

namespace GoS.Application.Features.Players.Queries.GetPlayerWinLossById;

public record GetPlayerWinLossByIdQuery(long AccountId, PlayerEndpointParameters Parameters)
    : ICacheableQuery<PlayerWinLoss?>, IPlayerEndpointParametersRequest
{
    public string GetCacheKey() => CacheKey.Create("player:wl", new { accountId = AccountId, p = Parameters });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(5);
    public TimeSpan? GetSlidingExpiration() => TimeSpan.FromMinutes(2);
}
