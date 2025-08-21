using System.Text.Json.Serialization;

namespace OpenDota.Enums.Permanent;

public enum MatchPlayerBenchmarkEnum
{
    [JsonPropertyName("raw")]
    Raw,
    
    [JsonPropertyName("pct")]
    Percentage,
}