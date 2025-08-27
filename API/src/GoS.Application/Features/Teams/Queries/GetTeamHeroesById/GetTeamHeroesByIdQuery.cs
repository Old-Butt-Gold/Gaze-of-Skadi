using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Domain.Teams.Models;

namespace GoS.Application.Features.Teams.Queries.GetTeamHeroesById;

public record GetTeamHeroesByIdQuery(int Id) : ICacheableQuery<List<TeamHero>?>
{
    public string GetCacheKey() => CacheKey.Create("team:heroes", new { id = Id });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(6);
    public TimeSpan? GetSlidingExpiration() => null;
}
