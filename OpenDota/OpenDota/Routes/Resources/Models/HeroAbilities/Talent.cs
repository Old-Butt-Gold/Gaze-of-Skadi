using System.Text.Json.Serialization;

namespace OpenDota.Routes.Resources.Models.HeroAbilities;

public class Talent
{
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("level")]
    public int Level { get; set; }
}