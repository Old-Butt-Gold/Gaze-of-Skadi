using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerRecentMatches;

internal sealed class GetPlayerRecentMatchesHandler(IRequester requester)
    : IRequestHandler<GetPlayerRecentMatchesQuery, IEnumerable<PlayerRecentMatch>?>
{
    public Task<IEnumerable<PlayerRecentMatch>?> Handle(GetPlayerRecentMatchesQuery request, CancellationToken ct) =>
        requester.GetResponseAsync<IEnumerable<PlayerRecentMatch>>($"players/{request.AccountId}/recentMatches", ct: ct);
}