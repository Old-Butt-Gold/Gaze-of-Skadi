using System.Text.Json.Serialization;

namespace GoS.Domain.Resources.Models.NeutralAbilities;

public class NeutralAbility
{
    [JsonPropertyName("img")]
    public string Image { get; set; }
}