using System.Text.Json.Serialization;

namespace OpenDota.Enums.Permanent;

/// <summary>
/// The primary attribute of the hero.
/// </summary>
public enum HeroPrimaryAttribute
{
    /// <summary>
    /// None attribute only for internal usage.
    /// </summary>
    [JsonIgnore] 
    None = 0,

    /// <summary>
    /// Agility attribute.
    /// </summary>
    [JsonPropertyName("agi")] 
    Agility = 1,

    /// <summary>
    /// Intelligence attribute.
    /// </summary>
    [JsonPropertyName("int")] 
    Intelligence = 2,

    /// <summary>
    /// Strength attribute.
    /// </summary>
    [JsonPropertyName("str")] 
    Strength = 3,

    /// <summary>
    /// Universal attribute.
    /// </summary>
    [JsonPropertyName("all")] 
    All = 4,
}