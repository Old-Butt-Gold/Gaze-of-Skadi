using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;

namespace GoS.Application.Features.Common.Queries.GetLaneRoles;

public record GetLaneRolesQuery : ICacheableQuery<IEnumerable<LaneRolesDto>?>
{
    public string GetCacheKey() => CacheKey.Create("scenarios:laneRoles");
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(6);
    public TimeSpan? GetSlidingExpiration() => null;
}
