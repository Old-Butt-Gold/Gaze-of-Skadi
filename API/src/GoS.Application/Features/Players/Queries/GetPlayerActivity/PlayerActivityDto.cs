using GoS.Application.Dto;
using GoS.Domain.BaseEnums;

namespace GoS.Application.Features.Players.Queries.GetPlayerActivity;

public class PlayerActivityDto
{
    public required Dictionary<DateOnly, IEnumerable<ActivityMatchDto>> MatchesByDay { get; init; }

    public required ActivityStatsDto Stats { get; init; }

    public long FirstMatchStartTime { get; init; }
}

public class ActivityMatchDto
{
    public long MatchId { get; init; }
    public int HeroId { get; init; }
    public int Duration { get; init; }
    public long StartTime { get; init; }
    public required BaseEnumDto<LeaverStatus> LeaverStatus { get; init; }
    public int? HeroVariant { get; init; }
    public int? PartySize { get; init; }
    public required BaseEnumDto<BooleanState> IsMatchParsed { get; init; }
    public required BaseEnumDto<BooleanState> IsRadiant { get; init; }
    public BaseEnumDto<BooleanState>? RadiantWin { get; init; }
}

public class ActivityStatsDto
{
    public required WinLossStats Overall { get; init; }

    public required Dictionary<int, WinLossStats> ByHour { get; init; }

    public required Dictionary<int, WinLossStats> ByDayOfWeek { get; init; }

    public required Dictionary<int, WinLossStats> ByMonth { get; init; }

    public required Dictionary<int, WinLossStats> ByYear { get; init; }
}

public class WinLossStats
{
    public int Wins { get; init; }
    public int Losses { get; init; }
    public double WinRate => Wins + Losses > 0 ? Math.Round((double)Wins / (Wins + Losses) * 100, 2) : 0;
}
