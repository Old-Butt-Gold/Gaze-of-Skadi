using GoS.Application.Dto;
using GoS.Domain.BaseEnums;

namespace GoS.Application.Features.Matches.Queries.FindMatches;

public class MatchFindDto
{
    public long MatchId { get; set; }
    public List<int> TeamA { get; set; } = [];
    public List<int> TeamB { get; set; } = [];
    public required BaseEnumDto<BooleanState> RadiantWin { get; set; }
    public long StartTime { get; set; }
}

