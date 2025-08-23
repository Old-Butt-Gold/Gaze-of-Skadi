using System.Text.Json.Serialization;

namespace GoS.Domain.Resources.Models.Items;

public class ItemAttribute
{
    [JsonPropertyName("key")]
    public string Key { get; set; }

    [JsonPropertyName("value")]
    public string Value { get; set; }
    
    [JsonPropertyName("display")]
    public string? Display { get; set; }
}