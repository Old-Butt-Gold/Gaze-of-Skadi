using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;

namespace GoS.Domain.Matches.Models;

public class MatchFind
{
    [JsonPropertyName("match_id")]
    public long MatchId { get; set; }

    [JsonPropertyName("teama")]
    public required List<int> TeamA { get; set; }

    [JsonPropertyName("teamb")]
    public required List<int> TeamB { get; set; }

    [JsonPropertyName("teamawin")]
    public BooleanState TeamAWin { get; set; }

    [JsonPropertyName("start_time")]
    public long StartTime { get; set; }
}
