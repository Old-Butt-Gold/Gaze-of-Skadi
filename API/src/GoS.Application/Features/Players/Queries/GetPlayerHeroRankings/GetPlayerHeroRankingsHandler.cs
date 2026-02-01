using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerHeroRankings;

internal sealed class GetPlayerHeroRankingsHandler(IRequester<OpenDotaHttpRequesterOptions> requester, IMapper mapper)
    : IRequestHandler<GetPlayerHeroRankingsQuery, IEnumerable<PlayerHeroRankingDto>?>
{
    public async Task<IEnumerable<PlayerHeroRankingDto>?> Handle(GetPlayerHeroRankingsQuery request, CancellationToken ct)
    {
        var playerHeroRankings = await requester.GetResponseAsync<IEnumerable<PlayerHeroRanking>>(
            $"players/{request.AccountId}/rankings", ct: ct);
        return mapper.Map<IEnumerable<PlayerHeroRankingDto>?>(playerHeroRankings);
    }
}
