using System.Text.Json.Serialization;

namespace GoS.Domain.Players.Models;

public class Alias
{
    [JsonPropertyName("personaname")]
    public string PersonaName { get; init; } = string.Empty;

    [JsonPropertyName("name_since")]
    public DateTimeOffset NameSince { get; init; }
}
