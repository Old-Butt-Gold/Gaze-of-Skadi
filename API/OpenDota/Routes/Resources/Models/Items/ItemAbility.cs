using System.Text.Json.Serialization;
using OpenDota.Routes.Resources.Models.Items.Enums;

namespace OpenDota.Routes.Resources.Models.Items;

public class ItemAbility
{
    [JsonPropertyName("type")]
    public AbilityType Type { get; set; }

    [JsonPropertyName("title")]
    public string Title { get; set; }

    [JsonPropertyName("description")]
    public string Description { get; set; }
}