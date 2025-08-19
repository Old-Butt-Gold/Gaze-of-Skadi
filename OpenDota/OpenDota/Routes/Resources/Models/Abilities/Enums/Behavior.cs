using System.Text.Json.Serialization;

namespace OpenDota.Routes.Resources.Models.Abilities.Enums;

public enum Behavior
{
    [JsonPropertyName("Unit Target")]
    UnitTarget, 
    
    [JsonPropertyName("Channeled")]
    Channeled, 
    
    [JsonPropertyName("Hidden")]
    Hidden, 
    
    [JsonPropertyName("Passive")]
    Passive, 
    
    [JsonPropertyName("No Target")]
    NoTarget, 
    
    [JsonPropertyName("Autocast")]
    Autocast,
    
    [JsonPropertyName("Instant Cast")]
    InstantCast, 
    
    [JsonPropertyName("AOE")]
    AreaOfEffect, 
    
    [JsonPropertyName("Point Target")]
    PointTarget, 
    
    [JsonPropertyName("Attack Modifier")]
    AttackModifier,
}