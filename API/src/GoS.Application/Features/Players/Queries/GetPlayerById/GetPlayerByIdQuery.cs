using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using GoS.Domain.Players.Models;

namespace GoS.Application.Features.Players.Queries.GetPlayerById;

public record GetPlayerByIdQuery(long AccountId) : ICacheableQuery<Player?>
{
    public string GetCacheKey() => CacheKey.Create("player:profile", new { accountId = AccountId });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(10);
    public TimeSpan? GetSlidingExpiration() => TimeSpan.FromMinutes(5);
}
