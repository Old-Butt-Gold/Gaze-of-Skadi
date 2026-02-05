namespace GoS.Application.Features.Stratz.GetMatchesByGameMode;

public sealed class MatchesByGameModeDto
{
    public IEnumerable<GameModeStatsDto> AllPick { get; set; } = [];
    public IEnumerable<GameModeStatsDto> CaptainsMode { get; set; } = [];
    public IEnumerable<GameModeStatsDto> AllPickRanked { get; set; } = [];
    public IEnumerable<GameModeStatsDto> Turbo { get; set; } = [];
}

public sealed class GameModeStatsDto
{
    public long MonthUnix { get; set; }
    public int MatchCount { get; set; }
}
