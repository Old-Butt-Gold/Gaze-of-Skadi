using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;
using GoS.Domain.Resources.Enums;
using GoS.Domain.Resources.Models.ItemColors;

namespace GoS.Domain.Resources.Models.Items;

public class Item
{
    [JsonPropertyName("abilities")]
    public List<ItemAbility>? Abilities { get; set; }

    [JsonPropertyName("hint")]
    public List<string>? Hints { get; set; }

    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("img")]
    public required string ImageUrl { get; set; }

    [JsonPropertyName("dname")]
    public string? DisplayName { get; set; }

    [JsonPropertyName("qual")]
    public ItemType? Quality { get; set; }

    [JsonPropertyName("cost")]
    public int? Cost { get; set; }

    [JsonPropertyName("behavior")]
    public List<Behavior>? CastingBehavior { get; set; }

    [JsonPropertyName("notes")]
    public string? Notes { get; set; }

    [JsonPropertyName("attrib")]
    public required List<ItemAttribute> Attributes { get; set; }

    [JsonPropertyName("mc")]
    public int? UsesMana { get; set; }

    [JsonPropertyName("hc")]
    public int? UsesHealth { get; set; }

    [JsonPropertyName("cd")]
    public int? Cooldown { get; set; }

    [JsonPropertyName("lore")]
    public string? Lore { get; set; }

    [JsonPropertyName("components")]
    public List<string>? Components { get; set; }

    [JsonPropertyName("created")]
    public BooleanState Created { get; set; }

    [JsonPropertyName("charges")]
    public string? Charges { get; set; }

    [JsonPropertyName("dmg_type")]
    public DamageType? DamageType { get; set; }

    [JsonPropertyName("target_team")]
    public List<TargetTeam>? TargetTeam { get; set; }

    [JsonPropertyName("target_type")]
    public List<TargetType>? TargetType { get; set; }

    [JsonPropertyName("dispellable")]
    public Dispellable? Dispellable { get; set; }

    [JsonPropertyName("bkbpierce")]
    public BooleanState? BkbPierce { get; set; }
}
