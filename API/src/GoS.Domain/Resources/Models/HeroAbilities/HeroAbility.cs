using System.Text.Json.Serialization;

namespace GoS.Domain.Resources.Models.HeroAbilities;

public class HeroAbility
{
    [JsonPropertyName("abilities")]
    public List<string> Abilities { get; set; } = [];

    [JsonPropertyName("talents")]
    public List<Talent> Talents { get; set; } = [];

    [JsonPropertyName("facets")]
    public List<Facet> Facets { get; set; } = [];

    [JsonPropertyName("shard")]
    public required Shard Shard { get; set; }

    [JsonPropertyName("aghanim_scepter")]
    public required AghanimScepter AghanimScepter { get; set; }
}
