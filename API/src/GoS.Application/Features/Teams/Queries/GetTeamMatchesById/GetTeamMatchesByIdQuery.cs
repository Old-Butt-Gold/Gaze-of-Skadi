using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;

namespace GoS.Application.Features.Teams.Queries.GetTeamMatchesById;

public record GetTeamMatchesByIdQuery(int Id) : ICacheableQuery<IEnumerable<TeamMatchDto>?>
{
    public string GetCacheKey() => CacheKey.Create("team:matches", new { id = Id });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(60);
    public TimeSpan? GetSlidingExpiration() => null;
}
