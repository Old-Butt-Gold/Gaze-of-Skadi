using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Domain.Resources.Models.Heroes;

namespace GoS.Application.Features.Heroes.Queries.GetHeroes;

public record GetHeroesQuery : ICacheableQuery<Dictionary<string, HeroInfo>?>
{
    public string GetCacheKey() => CacheKey.Create("heroes:all");
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(24);
    public TimeSpan? GetSlidingExpiration() => null;
}
