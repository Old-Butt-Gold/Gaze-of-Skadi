using System.Text.Json.Serialization;

namespace GoS.Domain.Resources.Enums;

public enum Dispellable
{
    [JsonPropertyName("No")]
    No,
    
    [JsonPropertyName("Strong Dispels Only")]
    StrongDispelsOnly,
    
    [JsonPropertyName("Yes")]
    Yes
}