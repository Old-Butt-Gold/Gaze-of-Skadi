using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.Features.Heroes.Common.Interfaces;

namespace GoS.Application.Features.Heroes.Queries.GetHeroDurations;

public record GetHeroDurationsQuery(int HeroId) : ICacheableQuery<IEnumerable<HeroDurationDto>?>, IHeroIdRequest
{
    public string GetCacheKey() => CacheKey.Create("hero:durations", new { heroId = HeroId });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(1);
    public TimeSpan? GetSlidingExpiration() => TimeSpan.FromMinutes(30);
}
