using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;

namespace GoS.Application.Features.Matches.Queries.GetMatchPlayersById;

public record GetMatchPlayersByIdQuery(long MatchId) : ICacheableQuery<IEnumerable<PlayerInfoDto>?>
{
    public string GetCacheKey() => CacheKey.Create("players", new { id = MatchId });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(1);
    public TimeSpan? GetSlidingExpiration() => null;
}
