using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;
using GoS.Domain.Resources.Enums;

namespace GoS.Domain.Resources.Models.Heroes;

public class HeroInfo
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [JsonPropertyName("primary_attr")]
    public HeroPrimaryAttribute PrimaryAttribute { get; set; }

    [JsonPropertyName("attack_type")]
    public HeroAttackType AttackType { get; set; }

    [JsonPropertyName("roles")]
    public IEnumerable<HeroRole> Roles { get; set; } = [];

    [JsonPropertyName("lore")]
    public required string Lore { get; set; }

    [JsonPropertyName("video")]
    public required string Video { get; set; }

    [JsonPropertyName("img")]
    public required string ImagePath { get; set; }

    [JsonPropertyName("icon")]
    public required string IconPath { get; set; }

    [JsonPropertyName("base_health")]
    public int BaseHealth { get; set; }

    [JsonPropertyName("base_health_regen")]
    public double BaseHealthRegen { get; set; }

    [JsonPropertyName("base_mana")]
    public int BaseMana { get; set; }

    [JsonPropertyName("base_mana_regen")]
    public double BaseManaRegen { get; set; }

    [JsonPropertyName("base_armor")]
    public double BaseArmor { get; set; }

    [JsonPropertyName("base_mr")]
    public double BaseMagicResistance { get; set; }

    [JsonPropertyName("base_attack_min")]
    public int BaseAttackMin { get; set; }

    [JsonPropertyName("base_attack_max")]
    public int BaseAttackMax { get; set; }

    [JsonPropertyName("base_str")]
    public int BaseStrength { get; set; }

    [JsonPropertyName("base_agi")]
    public int BaseAgility { get; set; }

    [JsonPropertyName("base_int")]
    public int BaseIntelligence { get; set; }

    [JsonPropertyName("str_gain")]
    public double StrengthGain { get; set; }

    [JsonPropertyName("agi_gain")]
    public double AgilityGain { get; set; }

    [JsonPropertyName("int_gain")]
    public double IntelligenceGain { get; set; }

    [JsonPropertyName("attack_range")]
    public int AttackRange { get; set; }

    [JsonPropertyName("projectile_speed")]
    public int ProjectileSpeed { get; set; }

    [JsonPropertyName("attack_rate")]
    public double AttackRate { get; set; }

    [JsonPropertyName("base_attack_time")]
    public int BaseAttackTime { get; set; }

    [JsonPropertyName("attack_point")]
    public double AttackPoint { get; set; }

    [JsonPropertyName("move_speed")]
    public int MoveSpeed { get; set; }

    [JsonPropertyName("turn_rate")]
    public double TurnRate { get; set; }

    [JsonPropertyName("cm_enabled")]
    // Availability in Captains Mode
    public BooleanState CmEnabled { get; set; }

    [JsonPropertyName("legs")]
    public int Legs { get; set; }

    [JsonPropertyName("day_vision")]
    public int DayVision { get; set; }

    [JsonPropertyName("night_vision")]
    public int NightVision { get; set; }

    [JsonPropertyName("localized_name")]
    public required string LocalizedName { get; set; }
}
