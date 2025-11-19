using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Domain.Teams.Models;
using MediatR;

namespace GoS.Application.Features.Teams.Queries.GetTeamHeroesById;

internal sealed class GetTeamHeroesByIdHandler(IRequester requester, IMapper mapper)
    : IRequestHandler<GetTeamHeroesByIdQuery, IEnumerable<TeamHeroDto>?>
{
    public async Task<IEnumerable<TeamHeroDto>?> Handle(GetTeamHeroesByIdQuery request, CancellationToken ct)
    {
        var heroes = await requester.GetResponseAsync<IEnumerable<TeamHero>>($"teams/{request.Id}/heroes", ct: ct);

        return mapper.Map<IEnumerable<TeamHeroDto>>(heroes);
    }
}