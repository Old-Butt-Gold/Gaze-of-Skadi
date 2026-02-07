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

public class AghanimScepter
{
    [JsonPropertyName("scepter_desc")]
    public string ScepterDesc { get; set; }

    [JsonPropertyName("scepter_skill_name")]
    public string ScepterSkillName { get; set; }

    [JsonPropertyName("video")]
    public string Video { get; set; }
}

public class Shard
{
    [JsonPropertyName("shard_desc")]
    public string ShardDesc { get; set; }

    [JsonPropertyName("shard_skill_name")]
    public string ShardSkillName { get; set; }

    [JsonPropertyName("video")]
    public string Video { get; set; }
}
