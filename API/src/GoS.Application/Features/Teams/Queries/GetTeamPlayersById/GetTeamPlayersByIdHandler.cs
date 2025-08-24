using GoS.Application.Abstractions;
using GoS.Domain.Teams.Models;
using MediatR;

namespace GoS.Application.Features.Teams.Queries.GetTeamPlayersById;

internal sealed class GetTeamPlayersByIdHandler(IRequester requester)
    : IRequestHandler<GetTeamPlayersByIdQuery, List<TeamPlayer>?>
{
    public Task<List<TeamPlayer>?> Handle(GetTeamPlayersByIdQuery request, CancellationToken ct)
    {
        return requester.GetResponseAsync<List<TeamPlayer>>($"teams/{request.Id}/players", ct: ct);
    }
}