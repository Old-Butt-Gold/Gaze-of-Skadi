using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.EndpointParameters;
using GoS.Application.Features.Players.Common.Interfaces;
using GoS.Domain.Players.Enums;

namespace GoS.Application.Features.Players.Queries.GetPlayerRecord;

public record GetPlayerRecordsQuery(long AccountId, PlayerField Field, PlayerEndpointParameters Parameters)
    : ICacheableQuery<IEnumerable<PlayerRecordDto>?>, IPlayerEndpointParametersRequest
{
    public string GetCacheKey() => CacheKey.Create("player:record", new { accountId = AccountId, field = Field, p = Parameters });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(60);
    public TimeSpan? GetSlidingExpiration() => null;
}
