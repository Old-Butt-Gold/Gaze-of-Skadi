using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerHeroRankings;

internal sealed class GetPlayerHeroRankingsHandler(IRequester requester)
    : IRequestHandler<GetPlayerHeroRankingsQuery, IEnumerable<PlayerHeroRanking>?>
{
    public Task<IEnumerable<PlayerHeroRanking>?> Handle(GetPlayerHeroRankingsQuery request, CancellationToken ct)
    {
        return requester.GetResponseAsync<IEnumerable<PlayerHeroRanking>>(
            $"players/{request.AccountId}/rankings", ct: ct);
    }
}