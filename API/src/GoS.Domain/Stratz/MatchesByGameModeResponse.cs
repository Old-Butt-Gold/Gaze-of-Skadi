using System.Text.Json.Serialization;

namespace GoS.Domain.Stratz;

public sealed class MatchesByGameModeResponse
{
    [JsonPropertyName("data")]
    public MatchesByGameModeData? Data { get; set; }
}

public sealed class MatchesByGameModeData
{
    [JsonPropertyName("heroStats")]
    public HeroStatsContainer? HeroStats { get; set; }
}

public sealed class HeroStatsContainer
{
    [JsonPropertyName("ALL_PICK")]
    public IEnumerable<WinMonthData>? AllPick { get; set; }

    [JsonPropertyName("CAPTAINS_MODE")]
    public IEnumerable<WinMonthData>? CaptainsMode { get; set; }

    [JsonPropertyName("ALL_PICK_RANKED")]
    public IEnumerable<WinMonthData>? AllPickRanked { get; set; }

    [JsonPropertyName("TURBO")]
    public IEnumerable<WinMonthData>? Turbo { get; set; }
}
