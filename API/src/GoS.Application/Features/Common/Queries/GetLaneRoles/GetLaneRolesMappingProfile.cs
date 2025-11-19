using AutoMapper;
using GoS.Domain.Common.Models;

namespace GoS.Application.Features.Common.Queries.GetLaneRoles;

public class GetLaneRolesMappingProfile : Profile
{
    public GetLaneRolesMappingProfile()
    {
        CreateMap<LaneRoles, LaneRolesDto>();
    }
}

