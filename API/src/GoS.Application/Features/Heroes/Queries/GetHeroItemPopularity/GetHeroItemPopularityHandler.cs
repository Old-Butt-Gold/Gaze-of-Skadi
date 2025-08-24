using GoS.Application.Abstractions;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroItemPopularity;

internal sealed class GetHeroItemPopularityHandler(IRequester requester)
    : IRequestHandler<GetHeroItemPopularityQuery, HeroItemPopularity?>
{
    public Task<HeroItemPopularity?> Handle(GetHeroItemPopularityQuery request, CancellationToken ct) =>
        requester.GetResponseAsync<HeroItemPopularity>($"heroes/{request.HeroId}/itemPopularity", ct: ct);
}