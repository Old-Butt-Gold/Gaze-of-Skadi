using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroItemPopularity;

internal sealed class GetHeroItemPopularityHandler(IRequester requester, IMapper mapper)
    : IRequestHandler<GetHeroItemPopularityQuery, HeroItemPopularityDto?>
{
    public async Task<HeroItemPopularityDto?> Handle(GetHeroItemPopularityQuery request, CancellationToken ct)
    {
        var heroItemPopularity = await requester.GetResponseAsync<HeroItemPopularity>($"heroes/{request.HeroId}/itemPopularity", ct: ct);
        return heroItemPopularity is null ? null : mapper.Map<HeroItemPopularityDto>(heroItemPopularity);
    }
}
