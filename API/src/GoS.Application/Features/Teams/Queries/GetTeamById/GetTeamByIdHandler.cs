using GoS.Application.Abstractions;
using GoS.Domain.Teams.Models;
using MediatR;

namespace GoS.Application.Features.Teams.Queries.GetTeamById;

internal sealed class GetTeamByIdHandler(IRequester requester)
    : IRequestHandler<GetTeamByIdQuery, Team?>
{
    public Task<Team?> Handle(GetTeamByIdQuery request, CancellationToken ct)
    {
        return requester.GetResponseAsync<Team>($"teams/{request.Id}", ct: ct);
    }
}