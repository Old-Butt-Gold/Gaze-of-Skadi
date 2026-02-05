using GoS.Application.Abstractions.Queries;

namespace GoS.Application.Features.Stratz.GetHeroesMeta;

public sealed record GetHeroesMetaQuery : ICacheableQuery<HeroesMetaDto?>
{
    public string GetCacheKey() => "stratz:heroes-meta";

    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(5);

    public TimeSpan? GetSlidingExpiration() => null;
}
