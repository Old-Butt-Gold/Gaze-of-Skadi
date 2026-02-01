using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroRanking;

internal sealed class GetHeroRankingsHandler(IRequester<OpenDotaHttpRequesterOptions> requester, IMapper mapper)
    : IRequestHandler<GetHeroRankingsQuery, HeroRankingDto?>
{
    public async Task<HeroRankingDto?> Handle(GetHeroRankingsQuery request, CancellationToken ct)
    {
        var parameters = new[]
        {
            new KeyValuePair<string, string>("hero_id", request.HeroId.ToString())
        };
        var heroRanking = await requester.GetResponseAsync<HeroRanking>("rankings", parameters, ct);
        return heroRanking is null ? null : mapper.Map<HeroRankingDto>(heroRanking);
    }
}
