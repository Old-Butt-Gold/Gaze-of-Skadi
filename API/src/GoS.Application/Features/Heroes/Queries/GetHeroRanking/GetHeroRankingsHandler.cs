using GoS.Application.Abstractions;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroRanking;

internal sealed class GetHeroRankingsHandler(IRequester requester)
    : IRequestHandler<GetHeroRankingsQuery, HeroRanking?>
{
    public Task<HeroRanking?> Handle(GetHeroRankingsQuery request, CancellationToken ct)
    {
        var parameters = new[]
        {
            new KeyValuePair<string, string>("hero_id", request.HeroId.ToString())
        };
        return requester.GetResponseAsync<HeroRanking>("rankings", parameters, ct);
    }
}