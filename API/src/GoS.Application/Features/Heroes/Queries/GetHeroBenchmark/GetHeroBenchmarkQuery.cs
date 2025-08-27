using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.Features.Heroes.Common.Interfaces;
using GoS.Domain.Heroes.Models;

namespace GoS.Application.Features.Heroes.Queries.GetHeroBenchmark;

public record GetHeroBenchmarkQuery(int HeroId) : ICacheableQuery<Benchmark?>, IHeroIdRequest
{
    public string GetCacheKey() => CacheKey.Create("hero:benchmark", new { heroId = HeroId });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(2);
    public TimeSpan? GetSlidingExpiration() => TimeSpan.FromMinutes(30);
}
