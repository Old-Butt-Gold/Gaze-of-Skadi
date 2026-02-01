using GoS.Application.Dto;
using GoS.Domain.BaseEnums;

namespace GoS.Application.Features.Heroes.Queries.GetHeroMatches;

public class HeroMatchDto
{
    public long MatchId { get; set; }
    public long StartTime { get; set; }
    public long Duration { get; set; }
    public required BaseEnumDto<BooleanState> RadiantWin { get; set; }
    public long LeagueId { get; set; }
    public string LeagueName { get; set; } = string.Empty;
    public required BaseEnumDto<BooleanState> IsRadiant { get; set; }
    public int PlayerSlot { get; set; }
    public long AccountId { get; set; }
    public long Kills { get; set; }
    public long Deaths { get; set; }
    public long Assists { get; set; }
}

