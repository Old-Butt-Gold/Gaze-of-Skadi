using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;

namespace GoS.Application.Features.Players.Queries.GetPlayerById;

public record GetPlayerByIdQuery(long AccountId) : ICacheableQuery<PlayerDto?>
{
    public string GetCacheKey() => CacheKey.Create("player:profile", new { accountId = AccountId });
    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromHours(1);
}
