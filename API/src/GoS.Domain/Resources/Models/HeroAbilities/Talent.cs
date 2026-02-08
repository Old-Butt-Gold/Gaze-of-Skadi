using System.Text.Json.Serialization;

namespace GoS.Domain.Resources.Models.HeroAbilities;

public class Talent
{
    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [JsonPropertyName("level")]
    public int Level { get; set; }
}
