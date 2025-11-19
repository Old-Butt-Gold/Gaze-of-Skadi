using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;

namespace GoS.Application.Features.Common.Queries.GetItemTimings;

public record GetItemTimingsQuery : ICacheableQuery<IEnumerable<ItemTimingDto>?>
{
    public string GetCacheKey() => CacheKey.Create("scenarios:itemTimings");
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(6);
    public TimeSpan? GetSlidingExpiration() => null;
}
