using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Domain.Common.Models;
using MediatR;

namespace GoS.Application.Features.Common.Queries.GetLaneRoles;

internal sealed class GetLaneRolesHandler(IRequester requester, IMapper mapper)
    : IRequestHandler<GetLaneRolesQuery, IEnumerable<LaneRolesDto>?>
{
    public async Task<IEnumerable<LaneRolesDto>?> Handle(GetLaneRolesQuery request, CancellationToken ct)
    {
        var laneRoles = await requester.GetResponseAsync<IEnumerable<LaneRoles>>("scenarios/laneRoles", ct: ct);

        return mapper.Map<IEnumerable<LaneRolesDto>>(laneRoles);
    }
}