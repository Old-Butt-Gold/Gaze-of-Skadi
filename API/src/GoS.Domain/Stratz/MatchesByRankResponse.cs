using System.Text.Json.Serialization;

namespace GoS.Domain.Stratz;

public sealed class MatchesByRankResponse
{
    [JsonPropertyName("data")]
    public MatchesByRankData? Data { get; set; }
}

public sealed class MatchesByRankData
{
    [JsonPropertyName("heroStats")]
    public HeroStatsRankContainer? HeroStats { get; set; }
}

public sealed class HeroStatsRankContainer
{
    [JsonPropertyName("HERALD")]
    public List<WinMonthData>? Herald { get; set; }

    [JsonPropertyName("GUARDIAN")]
    public List<WinMonthData>? Guardian { get; set; }

    [JsonPropertyName("CRUSADER")]
    public List<WinMonthData>? Crusader { get; set; }

    [JsonPropertyName("ARCHON")]
    public List<WinMonthData>? Archon { get; set; }

    [JsonPropertyName("LEGEND")]
    public List<WinMonthData>? Legend { get; set; }

    [JsonPropertyName("ANCIENT")]
    public List<WinMonthData>? Ancient { get; set; }

    [JsonPropertyName("DIVINE")]
    public List<WinMonthData>? Divine { get; set; }

    [JsonPropertyName("IMMORTAL")]
    public List<WinMonthData>? Immortal { get; set; }
}
