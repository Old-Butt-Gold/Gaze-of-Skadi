using GoS.Application.Abstractions.Queries;

namespace GoS.Application.Features.Stratz.GetHeroesMeta;

public sealed record GetHeroesMetaQuery(int Days = 30) : ICacheableQuery<HeroesMetaDto?>
{
    public string GetCacheKey() => $"stratz:heroes-meta:days:{Days}";

    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(5);

    public TimeSpan? GetSlidingExpiration() => null;
}
