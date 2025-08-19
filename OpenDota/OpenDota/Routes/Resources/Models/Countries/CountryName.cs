using System.Text.Json.Serialization;

namespace OpenDota.Routes.Resources.Models.Countries;

public class CountryName
{
    [JsonPropertyName("common")]
    public string Common { get; set; }
}