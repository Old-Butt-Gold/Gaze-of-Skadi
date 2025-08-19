using System.Text.Json.Serialization;

namespace OpenDota.Routes.Resources.Models.NeutralAbilities;

public class NeutralAbility
{
    [JsonPropertyName("img")]
    public string Image { get; set; }
}