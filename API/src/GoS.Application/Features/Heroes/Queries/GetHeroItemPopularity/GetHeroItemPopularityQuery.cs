using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.Features.Heroes.Common.Interfaces;
using GoS.Domain.Heroes.Models;

namespace GoS.Application.Features.Heroes.Queries.GetHeroItemPopularity;

public record GetHeroItemPopularityQuery(int HeroId) : ICacheableQuery<HeroItemPopularity?>, IHeroIdRequest
{
    public string GetCacheKey() => CacheKey.Create("hero:itemPopularity", new { heroId = HeroId });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(6);
    public TimeSpan? GetSlidingExpiration() => null;
}
