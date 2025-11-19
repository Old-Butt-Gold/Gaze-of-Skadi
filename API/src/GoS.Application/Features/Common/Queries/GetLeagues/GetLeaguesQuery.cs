using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;

namespace GoS.Application.Features.Common.Queries.GetLeagues;

public record GetLeaguesQuery : ICacheableQuery<IEnumerable<LeagueDto>?>
{
    public string GetCacheKey() => CacheKey.Create("leagues:all");
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(8);
    public TimeSpan? GetSlidingExpiration() => null;
}
