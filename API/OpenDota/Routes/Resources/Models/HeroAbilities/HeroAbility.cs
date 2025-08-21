using System.Text.Json.Serialization;

namespace OpenDota.Routes.Resources.Models.HeroAbilities;

public class HeroAbility
{
    [JsonPropertyName("abilities")] 
    public List<string> Abilities { get; set; } = [];

    [JsonPropertyName("talents")]
    public List<Talent> Talents { get; set; } = [];

    [JsonPropertyName("facets")]
    public List<Facet> Facets { get; set; } = [];
}