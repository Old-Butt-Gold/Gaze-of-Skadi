using GoS.Application.Abstractions;
using GoS.Domain.Teams.Models;
using MediatR;

namespace GoS.Application.Features.Teams.Queries.GetTeams;

public class GetTeamsHandler(IRequester requester) : IRequestHandler<GetTeamsQuery, List<Team>?>
{
    public Task<List<Team>?> Handle(GetTeamsQuery request, CancellationToken ct)
    {
        return requester.GetResponseAsync<List<Team>>("teams", ct: ct);
    }
}