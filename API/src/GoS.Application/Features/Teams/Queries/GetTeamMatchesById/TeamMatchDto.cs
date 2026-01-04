using GoS.Application.Dto;
using GoS.Domain.BaseEnums;

namespace GoS.Application.Features.Teams.Queries.GetTeamMatchesById;

public class TeamMatchDto
{
    public long MatchId { get; init; }
    public required BaseEnumDto<BooleanState> RadiantWin { get; init; }
    public int RadiantScore { get; init; }
    public int DireScore { get; init; }
    public required BaseEnumDto<BooleanState> Radiant { get; init; }
    public long Duration { get; init; }
    public long StartTime { get; init; }
    public Uri? OpposingTeamLogo { get; init; }
}

