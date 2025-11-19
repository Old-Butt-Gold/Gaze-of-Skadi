using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Domain.Teams.Models;
using MediatR;

namespace GoS.Application.Features.Teams.Queries.GetTeams;

internal sealed class GetTeamsHandler(IRequester requester, IMapper mapper) : IRequestHandler<GetTeamsQuery, IEnumerable<TeamDto>?>
{
    public async Task<IEnumerable<TeamDto>?> Handle(GetTeamsQuery request, CancellationToken ct)
    {
        var teams = await requester.GetResponseAsync<IEnumerable<Team>>("teams", ct: ct);

        return mapper.Map<IEnumerable<TeamDto>>(teams);
    }
}