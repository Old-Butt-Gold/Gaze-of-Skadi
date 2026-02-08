using System.Text.Json.Serialization;

namespace GoS.Domain.Resources.Models.HeroAbilities;

public class AghanimScepter
{
    [JsonPropertyName("scepter_desc")]
    public required string ScepterDesc { get; set; }

    [JsonPropertyName("scepter_skill_name")]
    public required string ScepterSkillName { get; set; }

    [JsonPropertyName("video")]
    public required string Video { get; set; }
}
