using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.Features.Heroes.Common.Interfaces;

namespace GoS.Application.Features.Common.Queries.GetItemTimings;

public record GetItemTimingsQuery(int HeroId) : ICacheableQuery<IEnumerable<ItemTimingDto>?>, IHeroIdRequest
{
    public string GetCacheKey() => CacheKey.Create("scenarios:itemTimings");
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(6);
    public TimeSpan? GetSlidingExpiration() => null;
}
