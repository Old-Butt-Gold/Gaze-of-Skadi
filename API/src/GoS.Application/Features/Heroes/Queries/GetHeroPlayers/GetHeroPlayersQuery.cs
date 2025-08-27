using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.Features.Heroes.Common.Interfaces;
using GoS.Domain.Heroes.Models;

namespace GoS.Application.Features.Heroes.Queries.GetHeroPlayers;

public record GetHeroPlayersQuery(int HeroId) : ICacheableQuery<IEnumerable<HeroPlayer>?>, IHeroIdRequest
{
    public string GetCacheKey() => CacheKey.Create("hero:players", new { heroId = HeroId });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(20);
    public TimeSpan? GetSlidingExpiration() => TimeSpan.FromMinutes(5);
}
