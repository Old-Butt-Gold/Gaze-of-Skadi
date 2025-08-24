using GoS.Application.Abstractions;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroPlayers;

internal sealed class GetHeroPlayersHandler(IRequester requester)
    : IRequestHandler<GetHeroPlayersQuery, IEnumerable<HeroPlayer>?>
{
    public Task<IEnumerable<HeroPlayer>?> Handle(GetHeroPlayersQuery request, CancellationToken ct) =>
        requester.GetResponseAsync<IEnumerable<HeroPlayer>>($"heroes/{request.HeroId}/players", ct: ct);
}