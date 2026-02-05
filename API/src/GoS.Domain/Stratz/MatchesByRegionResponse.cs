using System.Text.Json.Serialization;

namespace GoS.Domain.Stratz;

public sealed class MatchesByRegionResponse
{
    [JsonPropertyName("data")]
    public MatchesByRegionData? Data { get; set; }
}

public sealed class MatchesByRegionData
{
    [JsonPropertyName("heroStats")]
    public HeroStatsRegionContainer? HeroStats { get; set; }
}

public sealed class HeroStatsRegionContainer
{
    [JsonPropertyName("CHINA")]
    public IEnumerable<WinMonthData>? China { get; set; }

    [JsonPropertyName("SEA")]
    public IEnumerable<WinMonthData>? Sea { get; set; }

    [JsonPropertyName("NORTH_AMERICA")]
    public IEnumerable<WinMonthData>? NorthAmerica { get; set; }

    [JsonPropertyName("SOUTH_AMERICA")]
    public IEnumerable<WinMonthData>? SouthAmerica { get; set; }

    [JsonPropertyName("EUROPE")]
    public IEnumerable<WinMonthData>? Europe { get; set; }
}
