using System.Text.Json.Serialization;

namespace GoS.Domain.Resources.Models.HeroAbilities;

public class AghanimScepter
{
    [JsonPropertyName("scepter_desc")]
    public string ScepterDesc { get; set; }

    [JsonPropertyName("scepter_skill_name")]
    public string ScepterSkillName { get; set; }

    [JsonPropertyName("video")]
    public string Video { get; set; }
}
