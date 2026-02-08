using System.Text.Json.Serialization;
using GoS.Domain.Resources.Enums;

namespace GoS.Domain.Resources.Models.Items;

public class ItemAbility
{
    [JsonPropertyName("type")]
    public AbilityType Type { get; set; }

    [JsonPropertyName("title")]
    public required string Title { get; set; }

    [JsonPropertyName("description")]
    public required string Description { get; set; }
}
