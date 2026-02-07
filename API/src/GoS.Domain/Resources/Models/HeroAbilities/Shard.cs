using System.Text.Json.Serialization;

namespace GoS.Domain.Resources.Models.HeroAbilities;

public class Shard
{
    [JsonPropertyName("shard_desc")]
    public string ShardDesc { get; set; }

    [JsonPropertyName("shard_skill_name")]
    public string ShardSkillName { get; set; }

    [JsonPropertyName("video")]
    public string Video { get; set; }
}
