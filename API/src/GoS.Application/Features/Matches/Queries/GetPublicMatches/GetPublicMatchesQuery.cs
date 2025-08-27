using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Application.EndpointParameters;
using GoS.Domain.Matches.Models;

namespace GoS.Application.Features.Matches.Queries.GetPublicMatches;

public record GetPublicMatchesQuery(PublicMatchesEndpointParameters Parameters) : ICacheableQuery<IEnumerable<PublicMatch>?>
{
    public string GetCacheKey() => CacheKey.Create("matches:public", Parameters);
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromSeconds(30);
    public TimeSpan? GetSlidingExpiration() => null;
}
