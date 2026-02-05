using System.Text.Json.Serialization;

namespace GoS.Domain.Stratz;

public sealed class WinMonthData
{
    [JsonPropertyName("month")]
    public long Month { get; set; }

    [JsonPropertyName("matchCount")]
    public int MatchCount { get; set; }
}
