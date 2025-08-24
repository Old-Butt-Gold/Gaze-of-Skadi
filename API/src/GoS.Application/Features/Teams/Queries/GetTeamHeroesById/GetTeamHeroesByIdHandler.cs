using GoS.Application.Abstractions;
using GoS.Domain.Teams.Models;
using MediatR;

namespace GoS.Application.Features.Teams.Queries.GetTeamHeroesById;

internal sealed class GetTeamHeroesByIdHandler(IRequester requester)
    : IRequestHandler<GetTeamHeroesByIdQuery, List<TeamHero>?>
{
    public Task<List<TeamHero>?> Handle(GetTeamHeroesByIdQuery request, CancellationToken ct)
    {
        return requester.GetResponseAsync<List<TeamHero>>($"teams/{request.Id}/heroes", ct: ct);
    }
}