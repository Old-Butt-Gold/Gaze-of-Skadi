using System.Text.Json.Serialization;
using GoS.Domain.Resources.Enums;

namespace GoS.Domain.Resources.Models.Items;

public class ItemAbility
{
    [JsonPropertyName("type")]
    public AbilityType Type { get; set; }

    [JsonPropertyName("title")]
    public string Title { get; set; }

    [JsonPropertyName("description")]
    public string Description { get; set; }
}