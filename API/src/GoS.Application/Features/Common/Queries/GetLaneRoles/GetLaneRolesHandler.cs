using GoS.Application.Abstractions;
using GoS.Domain.Common.Models;
using MediatR;

namespace GoS.Application.Features.Common.Queries.GetLaneRoles;

internal sealed class GetLaneRolesHandler(IRequester requester)
    : IRequestHandler<GetLaneRolesQuery, IEnumerable<LaneRoles>?>
{
    public Task<IEnumerable<LaneRoles>?> Handle(GetLaneRolesQuery request, CancellationToken ct)
    {
        return requester.GetResponseAsync<IEnumerable<LaneRoles>>("scenarios/laneRoles", ct: ct);
    }
}