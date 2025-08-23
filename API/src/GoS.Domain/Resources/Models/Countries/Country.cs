using System.Text.Json.Serialization;

namespace GoS.Domain.Resources.Models.Countries;

public class Country
{
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("cca2")]
    public string Cca2 { get; set; }
}