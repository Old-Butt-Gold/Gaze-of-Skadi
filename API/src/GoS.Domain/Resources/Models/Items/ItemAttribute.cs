using System.Text.Json.Serialization;

namespace GoS.Domain.Resources.Models.Items;

public class ItemAttribute
{
    [JsonPropertyName("key")]
    public required string Key { get; set; }

    [JsonPropertyName("value")]
    public required string Value { get; set; }

    [JsonPropertyName("display")]
    public string? Display { get; set; }
}
