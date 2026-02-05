using GoS.Application.Abstractions.Queries;

namespace GoS.Application.Features.Stratz.GetPlayerQueue;

public sealed record GetPlayersQueueQuery : ICacheableQuery<IEnumerable<PlayersQueueDto>?>
{
    public string GetCacheKey() => "stratz:players-queue";

    public TimeSpan? GetAbsoluteExpirationRelativeToNow() => TimeSpan.FromMinutes(5);

    public TimeSpan? GetSlidingExpiration() => null;
}
