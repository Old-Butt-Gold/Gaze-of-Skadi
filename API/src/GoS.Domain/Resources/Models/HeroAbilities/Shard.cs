using System.Text.Json.Serialization;

namespace GoS.Domain.Resources.Models.HeroAbilities;

public class Shard
{
    [JsonPropertyName("shard_desc")]
    public required string ShardDesc { get; set; }

    [JsonPropertyName("shard_skill_name")]
    public required string ShardSkillName { get; set; }

    [JsonPropertyName("video")]
    public required string Video { get; set; }
}
