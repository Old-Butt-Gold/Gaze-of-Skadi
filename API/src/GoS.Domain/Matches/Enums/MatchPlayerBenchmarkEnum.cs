using System.Text.Json.Serialization;

namespace GoS.Domain.Matches.Enums;

public enum MatchPlayerBenchmarkEnum
{
    [JsonPropertyName("raw")]
    Raw,
    
    [JsonPropertyName("pct")]
    Percentage,
}