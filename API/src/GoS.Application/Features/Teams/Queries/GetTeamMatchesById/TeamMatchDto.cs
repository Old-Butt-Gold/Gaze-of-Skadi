using GoS.Application.Dto;
using GoS.Domain.BaseEnums;

namespace GoS.Application.Features.Teams.Queries.GetTeamMatchesById;

public class TeamMatchDto
{
    public long MatchId { get; init; }
    public BaseEnumDto<BooleanState> RadiantWin { get; init; }
    public int RadiantScore { get; init; }
    public int DireScore { get; init; }
    public BaseEnumDto<BooleanState> Radiant { get; init; }
    public long Duration { get; init; }
    public long StartTime { get; init; }
}

