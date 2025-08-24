using GoS.Domain.Common.Models;
using MediatR;

namespace GoS.Application.Features.Common.Queries.GetLaneRoles;

public record GetLaneRolesQuery : IRequest<IEnumerable<LaneRoles>?>;