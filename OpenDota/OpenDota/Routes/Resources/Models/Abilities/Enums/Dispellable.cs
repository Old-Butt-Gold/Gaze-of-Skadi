using System.Text.Json.Serialization;

namespace OpenDota.Routes.Resources.Models.Abilities.Enums;

public enum Dispellable
{
    [JsonPropertyName("No")]
    No,
    
    [JsonPropertyName("Strong Dispels Only")]
    StrongDispelsOnly,
    
    [JsonPropertyName("Yes")]
    Yes
}