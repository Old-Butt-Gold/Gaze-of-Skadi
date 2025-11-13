using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Domain.Common.Enums;
using GoS.Domain.Common.Models;

namespace GoS.Application.Features.Common.Queries.GetRecordsByField;

public record GetRecordsByFieldQuery(CommonFieldRecords Field) : ICacheableQuery<IEnumerable<Record>?>
{
    public string GetCacheKey() => CacheKey.Create("common:records", new { field = Field });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(1);
    public TimeSpan? GetSlidingExpiration() => null;
}
