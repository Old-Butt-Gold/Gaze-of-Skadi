using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;

namespace GoS.Application.Features.Teams.Queries.GetTeamHeroesById;

public record GetTeamHeroesByIdQuery(int Id) : ICacheableQuery<IEnumerable<TeamHeroDto>?>
{
    public string GetCacheKey() => CacheKey.Create("team:heroes", new { id = Id });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(6);
    public TimeSpan? GetSlidingExpiration() => null;
}
