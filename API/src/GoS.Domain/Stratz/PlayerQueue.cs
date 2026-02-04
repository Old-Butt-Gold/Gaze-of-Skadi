using System.Text.Json.Serialization;

namespace GoS.Domain.Stratz;

public sealed class PlayersRegionsData
{
    [JsonPropertyName("data")]
    public PlayersRegions? Data { get; set; }
}

public sealed class PlayersRegions
{
    [JsonPropertyName("stratz")]
    public StratzData? Stratz { get; set; }
}

public sealed class StratzData
{
    [JsonPropertyName("page")]
    public PageData? Page { get; set; }
}

public sealed class PageData
{
    [JsonPropertyName("matches")]
    public MatchesData? Matches { get; set; }
}

public sealed class MatchesData
{
    [JsonPropertyName("matchmakingStats")]
    public List<PlayersQueue>? MatchmakingStats { get; set; }
}

public sealed class PlayersQueue
{
    [JsonPropertyName("timestamp")]
    public long Timestamp { get; set; }

    [JsonPropertyName("australia")]
    public int Australia { get; set; }

    [JsonPropertyName("austria")]
    public int Austria { get; set; }

    [JsonPropertyName("brazil")]
    public int Brazil { get; set; }

    [JsonPropertyName("chile")]
    public int Chile { get; set; }

    [JsonPropertyName("dubai")]
    public int Dubai { get; set; }

    [JsonPropertyName("europe")]
    public int Europe { get; set; }

    [JsonPropertyName("india")]
    public int India { get; set; }

    [JsonPropertyName("japan")]
    public int Japan { get; set; }

    [JsonPropertyName("perfectWorldTelecom")]
    public int PerfectWorldTelecom { get; set; }

    [JsonPropertyName("perfectWorldTelecomGuangdong")]
    public int PerfectWorldTelecomGuangdong { get; set; }

    [JsonPropertyName("perfectWorldTelecomWuhan")]
    public int PerfectWorldTelecomWuhan { get; set; }

    [JsonPropertyName("perfectWorldTelecomZhejiang")]
    public int PerfectWorldTelecomZhejiang { get; set; }

    [JsonPropertyName("perfectWorldUnicom")]
    public int PerfectWorldUnicom { get; set; }

    [JsonPropertyName("perfectWorldUnicomTianjin")]
    public int PerfectWorldUnicomTianjin { get; set; }

    [JsonPropertyName("peru")]
    public int Peru { get; set; }

    [JsonPropertyName("singapore")]
    public int Singapore { get; set; }

    [JsonPropertyName("southAfrica")]
    public int SouthAfrica { get; set; }

    [JsonPropertyName("stockholm")]
    public int Stockholm { get; set; }

    [JsonPropertyName("taiwan")]
    public int Taiwan { get; set; }

    [JsonPropertyName("usEast")]
    public int UsEast { get; set; }

    [JsonPropertyName("usWest")]
    public int UsWest { get; set; }
}
