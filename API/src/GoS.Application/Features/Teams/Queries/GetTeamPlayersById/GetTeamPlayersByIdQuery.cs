using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;

namespace GoS.Application.Features.Teams.Queries.GetTeamPlayersById;

public record GetTeamPlayersByIdQuery(int Id) : ICacheableQuery<IEnumerable<TeamPlayerDto>?>
{
    public string GetCacheKey() => CacheKey.Create("team:players", new { id = Id });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(6);
    public TimeSpan? GetSlidingExpiration() => null;
}
