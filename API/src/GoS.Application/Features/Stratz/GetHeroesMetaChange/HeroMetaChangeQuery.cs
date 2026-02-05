using GoS.Application.Abstractions.Queries;
using GoS.Application.Features.Heroes.Common.Interfaces;

namespace GoS.Application.Features.Stratz.GetHeroesMetaChange;

public record HeroMetaChangeQuery(int HeroId) : ICacheableQuery<HeroMetaTimelineDto?>, IHeroIdRequest
{
    public string GetCacheKey() => $"stratz:hero-meta-change:{HeroId}";

    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(5);

    public TimeSpan? GetSlidingExpiration() => null;
}
