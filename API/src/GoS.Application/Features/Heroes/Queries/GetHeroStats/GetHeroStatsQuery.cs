using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Domain.Heroes.Models;

namespace GoS.Application.Features.Heroes.Queries.GetHeroStats;

public record GetHeroStatsQuery : ICacheableQuery<IEnumerable<HeroStats>?>
{
    public string GetCacheKey() => CacheKey.Create("hero:stats");
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(1);
    public TimeSpan? GetSlidingExpiration() => TimeSpan.FromMinutes(30);
}
