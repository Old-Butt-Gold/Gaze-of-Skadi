using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Domain.Teams.Models;

namespace GoS.Application.Features.Teams.Queries.GetTeamPlayersById;

public record GetTeamPlayersByIdQuery(int Id) : ICacheableQuery<List<TeamPlayer>?>
{
    public string GetCacheKey() => CacheKey.Create("team:players", new { id = Id });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(6);
    public TimeSpan? GetSlidingExpiration() => null;
}
