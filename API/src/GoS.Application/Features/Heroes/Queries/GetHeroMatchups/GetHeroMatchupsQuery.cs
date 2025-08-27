using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.Features.Heroes.Common.Interfaces;
using GoS.Domain.Heroes.Models;

namespace GoS.Application.Features.Heroes.Queries.GetHeroMatchups;

public record GetHeroMatchupsQuery(int HeroId) : ICacheableQuery<IEnumerable<HeroMatchup>?>, IHeroIdRequest
{
    public string GetCacheKey() => CacheKey.Create("hero:matchups", new { heroId = HeroId });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(30);
    public TimeSpan? GetSlidingExpiration() => TimeSpan.FromMinutes(10);
}
