using GoS.Application.Abstractions;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroMatches;

internal sealed class GetHeroMatchesHandler(IRequester requester)
    : IRequestHandler<GetHeroMatchesQuery, IEnumerable<HeroMatch>?>
{
    public Task<IEnumerable<HeroMatch>?> Handle(GetHeroMatchesQuery request, CancellationToken ct) =>
        requester.GetResponseAsync<IEnumerable<HeroMatch>>($"heroes/{request.HeroId}/matches", ct: ct);
}