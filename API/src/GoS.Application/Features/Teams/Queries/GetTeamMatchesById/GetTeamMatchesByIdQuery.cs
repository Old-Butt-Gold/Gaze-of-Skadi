using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Domain.Teams.Models;

namespace GoS.Application.Features.Teams.Queries.GetTeamMatchesById;

public record GetTeamMatchesByIdQuery(int Id) : ICacheableQuery<List<TeamMatch>?>
{
    public string GetCacheKey() => CacheKey.Create("team:matches", new { id = Id });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(60);
    public TimeSpan? GetSlidingExpiration() => null;
}
