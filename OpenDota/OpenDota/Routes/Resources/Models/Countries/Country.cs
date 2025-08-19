using System.Text.Json.Serialization;

namespace OpenDota.Routes.Resources.Models.Countries;

public class Country
{
    [JsonPropertyName("name")]
    public CountryName Name { get; set; }

    [JsonPropertyName("cca2")]
    public string Cca2 { get; set; }
}