using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.Features.Heroes.Common.Interfaces;

namespace GoS.Application.Features.Common.Queries.GetLaneRoles;

public record GetLaneRolesQuery(int HeroId) : ICacheableQuery<IEnumerable<LaneRolesDto>?>, IHeroIdRequest
{
    public string GetCacheKey() => CacheKey.Create("scenarios:laneRoles");
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(6);
    public TimeSpan? GetSlidingExpiration() => null;
}
