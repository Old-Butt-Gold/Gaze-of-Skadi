using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;

namespace GoS.Application.Features.Teams.Queries.GetTeamById;

public record GetTeamByIdQuery(int Id) : ICacheableQuery<TeamByIdDto?>
{
    public string GetCacheKey() => CacheKey.Create("team", new { id = Id });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(24);
    public TimeSpan? GetSlidingExpiration() => null;
}
