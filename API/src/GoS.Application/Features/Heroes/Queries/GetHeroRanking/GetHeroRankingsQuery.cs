using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.Features.Heroes.Common.Interfaces;

namespace GoS.Application.Features.Heroes.Queries.GetHeroRanking;

public record GetHeroRankingsQuery(int HeroId) : ICacheableQuery<HeroRankingDto?>, IHeroIdRequest
{
    public string GetCacheKey() => CacheKey.Create("hero:rankings", new { heroId = HeroId });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(2);
    public TimeSpan? GetSlidingExpiration() => TimeSpan.FromMinutes(30);
}
