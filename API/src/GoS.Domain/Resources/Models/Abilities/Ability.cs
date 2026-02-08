using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;
using GoS.Domain.Resources.Enums;

namespace GoS.Domain.Resources.Models.Abilities;

public class Ability
{
    [JsonPropertyName("dname")]
    public string? DisplayName { get; init; }

    [JsonPropertyName("img")]
    public string? Image { get; init; }

    [JsonPropertyName("video")]
    public string? Video { get; init; }

    [JsonPropertyName("attrib")]
    public List<Attribute>? Attributes { get; set; }

    [JsonPropertyName("behavior")]
    public List<Behavior>? Behavior { get; set; }

    [JsonPropertyName("target_type")]
    public List<TargetType>? TargetType { get; set; }

    [JsonPropertyName("dmg_type")]
    public DamageType? DamageType { get; set; }

    [JsonPropertyName("desc")]
    public string? Description { get; set; }

    [JsonPropertyName("mc")]
    public List<string>? ManaCost { get; set; }

    [JsonPropertyName("cd")]
    public List<string>? Cooldown { get; set; }

    [JsonPropertyName("lore")]
    public string? Lore { get; set; }

    [JsonPropertyName("dispellable")]
    public Dispellable? Dispellable { get; set; }

    [JsonPropertyName("target_team")]
    public List<TargetTeam>? TargetTeam { get; set; }

    [JsonPropertyName("bkbpierce")]
    public BooleanState? BkbPierce { get; set; }

    /// <summary>
    /// Врожденная способность
    /// </summary>
    [JsonPropertyName("is_innate")]
    public BooleanState? IsInnate { get; set; }
}
