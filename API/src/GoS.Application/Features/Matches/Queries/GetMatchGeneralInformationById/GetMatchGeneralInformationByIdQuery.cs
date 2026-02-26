using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;

namespace GoS.Application.Features.Matches.Queries.GetMatchGeneralInformationById;

public record GetMatchGeneralInformationByIdQuery(long MatchId) : ICacheableQuery<MatchGeneralInformationDto?>
{
    public string GetCacheKey() => CacheKey.Create("players", new { id = MatchId });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(1);
    public TimeSpan? GetSlidingExpiration() => null;
}
