using GoS.Application.Abstractions;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroMatchups;

internal sealed class GetHeroMatchupsHandler(IRequester requester)
    : IRequestHandler<GetHeroMatchupsQuery, IEnumerable<HeroMatchup>?>
{
    public Task<IEnumerable<HeroMatchup>?> Handle(GetHeroMatchupsQuery request, CancellationToken ct) =>
        requester.GetResponseAsync<IEnumerable<HeroMatchup>>($"heroes/{request.HeroId}/matchups", ct: ct);
}