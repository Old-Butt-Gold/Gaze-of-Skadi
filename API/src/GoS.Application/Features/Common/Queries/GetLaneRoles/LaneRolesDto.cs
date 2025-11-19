using GoS.Application.Dto;
using GoS.Domain.BaseEnums;

namespace GoS.Application.Features.Common.Queries.GetLaneRoles;

public class LaneRolesDto
{
    public int HeroId { get; init; }
    public BaseEnumDto<LaneRole> LaneRole { get; init; }
    public int Time { get; init; }
    public int Games { get; init; }
    public int Wins { get; init; }
}

