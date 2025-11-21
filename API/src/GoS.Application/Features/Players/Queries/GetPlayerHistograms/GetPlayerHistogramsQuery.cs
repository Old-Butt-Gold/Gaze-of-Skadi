using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.EndpointParameters;
using GoS.Application.Features.Players.Common.Interfaces;
using GoS.Domain.Players.Enums;

namespace GoS.Application.Features.Players.Queries.GetPlayerHistograms;

public record GetPlayerHistogramsQuery(long AccountId, PlayerFieldHistogram Field, PlayerEndpointParameters Parameters)
    : ICacheableQuery<IEnumerable<PlayerHistogramDto>?>, IPlayerEndpointParametersRequest
{
    public string GetCacheKey() => CacheKey.Create("player:histograms", new { accountId = AccountId, field = Field, p = Parameters });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(30);
    public TimeSpan? GetSlidingExpiration() => null;
}
