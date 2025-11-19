using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;

namespace GoS.Application.Features.Teams.Queries.GetTeams;

public record GetTeamsQuery : ICacheableQuery<IEnumerable<TeamDto>?>
{
    public string GetCacheKey() => CacheKey.Create("teams:all");
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(24);
    public TimeSpan? GetSlidingExpiration() => null;
}
