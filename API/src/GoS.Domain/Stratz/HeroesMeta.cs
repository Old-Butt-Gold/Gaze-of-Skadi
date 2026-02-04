using System.Text.Json.Serialization;

namespace GoS.Domain.Stratz;

public sealed class HeroesMetaData
{
    [JsonPropertyName("data")]
    public HeroesMeta? Data { get; set; }
}


public sealed class HeroesMeta
{
    [JsonPropertyName("heroesPos1")]
    public HeroStatsQuery? HeroesPos1 { get; set; }

    [JsonPropertyName("heroesPos2")]
    public HeroStatsQuery? HeroesPos2 { get; set; }

    [JsonPropertyName("heroesPos3")]
    public HeroStatsQuery? HeroesPos3 { get; set; }

    [JsonPropertyName("heroesPos4")]
    public HeroStatsQuery? HeroesPos4 { get; set; }

    [JsonPropertyName("heroesPos5")]
    public HeroStatsQuery? HeroesPos5 { get; set; }
}

public sealed class HeroStatsQuery
{
    [JsonPropertyName("winDay")]
    public List<HeroWinDay>? WinDay { get; set; }
}

public sealed class HeroWinDay
{
    [JsonPropertyName("heroId")]
    public int HeroId { get; set; }

    [JsonPropertyName("matchCount")]
    public int MatchCount { get; set; }

    [JsonPropertyName("winCount")]
    public int WinCount { get; set; }

    public double WinRate => MatchCount > 0 ? Math.Round((double)WinCount / MatchCount * 100, 2) : 0;
}
