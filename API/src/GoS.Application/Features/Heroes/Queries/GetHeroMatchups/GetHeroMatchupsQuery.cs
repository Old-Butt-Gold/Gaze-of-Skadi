using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.Features.Heroes.Common.Interfaces;

namespace GoS.Application.Features.Heroes.Queries.GetHeroMatchups;

public record GetHeroMatchupsQuery(int HeroId) : ICacheableQuery<IEnumerable<HeroMatchupDto>?>, IHeroIdRequest
{
    public string GetCacheKey() => CacheKey.Create("hero:matchups", new { heroId = HeroId });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(30);
    public TimeSpan? GetSlidingExpiration() => TimeSpan.FromMinutes(10);
}
