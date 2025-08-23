using GoS.Application.Abstractions;
using GoS.Domain.Teams.Models;
using MediatR;

namespace GoS.Application.Features.Teams.Queries.GetTeamMatchesById;

public class GetTeamMatchesByIdHandler(IRequester requester)
    : IRequestHandler<GetTeamMatchesByIdQuery, List<TeamMatch>?>
{
    public Task<List<TeamMatch>?> Handle(GetTeamMatchesByIdQuery request, CancellationToken ct)
    {
        return requester.GetResponseAsync<List<TeamMatch>>($"teams/{request.Id}/matches", ct: ct);
    }
}