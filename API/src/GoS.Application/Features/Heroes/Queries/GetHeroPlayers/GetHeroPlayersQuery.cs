using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.Features.Heroes.Common.Interfaces;

namespace GoS.Application.Features.Heroes.Queries.GetHeroPlayers;

public record GetHeroPlayersQuery(int HeroId) : ICacheableQuery<IEnumerable<HeroPlayerDto>?>, IHeroIdRequest
{
    public string GetCacheKey() => CacheKey.Create("hero:players", new { heroId = HeroId });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(20);
    public TimeSpan? GetSlidingExpiration() => TimeSpan.FromMinutes(5);
}
