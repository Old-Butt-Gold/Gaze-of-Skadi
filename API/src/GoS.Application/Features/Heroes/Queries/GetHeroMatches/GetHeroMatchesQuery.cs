using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.Features.Heroes.Common.Interfaces;

namespace GoS.Application.Features.Heroes.Queries.GetHeroMatches;

public record GetHeroMatchesQuery(int HeroId) : ICacheableQuery<IEnumerable<HeroMatchDto>?>, IHeroIdRequest
{
    public string GetCacheKey() => CacheKey.Create("hero:matches", new { heroId = HeroId });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(1);
}
