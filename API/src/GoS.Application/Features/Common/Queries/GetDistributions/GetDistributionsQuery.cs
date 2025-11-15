using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;

namespace GoS.Application.Features.Common.Queries.GetDistributions;

public record GetDistributionsQuery : ICacheableQuery<DistributionDto?>
{
    public string GetCacheKey() => CacheKey.Create("common:distributions");
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(24);
    public TimeSpan? GetSlidingExpiration() => null;
}