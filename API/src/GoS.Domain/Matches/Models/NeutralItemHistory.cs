using System.Text.Json.Serialization;

namespace GoS.Domain.Matches.Models;

public class NeutralItemHistory
{
    [JsonPropertyName("time")]
    public int Time { get; set; }

    [JsonPropertyName("item_neutral")]
    public string? ItemNeutral { get; set; }

    [JsonPropertyName("item_neutral_enhancement")]
    public required string ItemNeutralEnhancement { get; set; }
}
