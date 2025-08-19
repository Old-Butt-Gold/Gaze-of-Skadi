using System.Text.Json.Serialization;
using OpenDota.Enums.Permanent;

namespace OpenDota.Routes.Resources.Models.AghanimDescriptions;

public class AghanimDescription
{
    [JsonPropertyName("hero_name")]
    public string HeroName { get; set; }

    [JsonPropertyName("hero_id")]
    public int HeroId { get; set; }

    [JsonPropertyName("has_scepter")]
    public BooleanState HasScepter { get; set; }

    [JsonPropertyName("scepter_desc")]
    public string ScepterDesc { get; set; }

    [JsonPropertyName("scepter_skill_name")]
    public string ScepterSkillName { get; set; }

    [JsonPropertyName("scepter_new_skill")]
    public BooleanState ScepterNewSkill { get; set; }

    [JsonPropertyName("has_shard")]
    public BooleanState HasShard { get; set; }

    [JsonPropertyName("shard_desc")]
    public string ShardDesc { get; set; }

    [JsonPropertyName("shard_skill_name")]
    public string ShardSkillName { get; set; }

    [JsonPropertyName("shard_new_skill")]
    public BooleanState ShardNewSkill { get; set; }
}