using System.Text.Json.Serialization;
using OpenDota.Enums.Permanent;

namespace OpenDota.Routes.Heroes.Models;

/// <summary>
/// Represents hero stats.
/// </summary>
public class HeroStats
{
	/// <summary>
	/// Gets numeric identifier for the hero object.
	/// </summary>
	[JsonPropertyName("id")]
	public int Id { get; init; }

	/// <summary>
	/// Gets dota hero command name, e.g. 'npc_dota_hero_antimage'.
	/// </summary>
	[JsonPropertyName("name")]
	public string Name { get; init; } = string.Empty;

	/// <summary>
	/// Gets hero primary shorthand attribute name, e.g. 'agi'.
	/// </summary>
	[JsonPropertyName("primary_attr")]
	public HeroPrimaryAttribute PrimaryAttribute { get; init; } = HeroPrimaryAttribute.None;

	/// <summary>
	/// Gets hero attack type, either 'Melee' or 'Ranged'.
	/// </summary>
	[JsonPropertyName("attack_type")]
	public HeroAttackType AttackType { get; init; } = HeroAttackType.None;

	/// <summary>
	/// Gets hero's role in the game.
	/// </summary>
	[JsonPropertyName("roles")]
	public List<HeroRole> Roles { get; init; } = [];

	/// <summary>
	/// Gets the image.
	/// </summary>
	[JsonPropertyName("img")]
	public string Image { get; init; } = string.Empty;

	/// <summary>
	/// Gets the icon.
	/// </summary>
	[JsonPropertyName("icon")]
	public string Icon { get; init; } = string.Empty;

	/// <summary>
	/// Gets the base health.
	/// </summary>
	[JsonPropertyName("base_health")]
	public int BaseHealth { get; init; }

	/// <summary>
	/// Gets the base health regen.
	/// </summary>
	[JsonPropertyName("base_health_regen")]
	public double? BaseHealthRegen { get; init; }

	/// <summary>
	/// Gets the base mana.
	/// </summary>
	[JsonPropertyName("base_mana")]
	public int BaseMana { get; init; }

	/// <summary>
	/// Gets the base mana regen.
	/// </summary>
	[JsonPropertyName("base_mana_regen")]
	public double BaseManaRegen { get; init; }

	/// <summary>
	/// Gets the base armor.
	/// </summary>
	[JsonPropertyName("base_armor")]
	public double BaseArmor { get; init; }

	/// <summary>
	/// Gets the base magic resistance.
	/// </summary>
	[JsonPropertyName("base_mr")]
	public int BaseMr { get; init; }

	/// <summary>
	/// Gets the base attack max.
	/// </summary>
	[JsonPropertyName("base_attack_max")]
	public int BaseAttackMax { get; init; }

	/// <summary>
	/// Gets the base attack min.
	/// </summary>
	[JsonPropertyName("base_attack_min")]
	public int BaseAttackMin { get; init; }

	/// <summary>
	/// Gets the base strength.
	/// </summary>
	[JsonPropertyName("base_str")]
	public int BaseStrength { get; init; }

	/// <summary>
	/// Gets the base agility.
	/// </summary>
	[JsonPropertyName("base_agi")]
	public int BaseAgility { get; init; }

	/// <summary>
	/// Gets the base intelligence.
	/// </summary>
	[JsonPropertyName("base_int")]
	public int BaseIntelligence { get; init; }

	/// <summary>
	/// Gets the strength gain.
	/// </summary>
	[JsonPropertyName("str_gain")]
	public double StrengthGain { get; init; }

	/// <summary>
	/// Gets the agility gain.
	/// </summary>
	[JsonPropertyName("agi_gain")]
	public double AgilityGain { get; init; }

	/// <summary>
	/// Gets the intelligence gain.
	/// </summary>
	[JsonPropertyName("int_gain")]
	public double IntelligenceGain { get; init; }

	/// <summary>
	/// Gets the attack range.
	/// </summary>
	[JsonPropertyName("attack_range")]
	public int AttackRange { get; init; }

	/// <summary>
	/// Gets the projectile speed.
	/// </summary>
	[JsonPropertyName("projectile_speed")]
	public int ProjectileSpeed { get; init; }

	/// <summary>
	/// Gets the attack rate.
	/// </summary>
	[JsonPropertyName("attack_rate")]
	public double AttackRate { get; init; }

	/// <summary>
	/// Get the base time attack
	/// </summary>
	[JsonPropertyName("base_attack_time")]
	public int BaseAttackTime { get; init; }

	/// <summary>
	/// Gets the attack point.
	/// </summary>
	[JsonPropertyName("attack_point")]
	public double AttackPoint { get; init; }

	/// <summary>
	/// Gets the move speed.
	/// </summary>
	[JsonPropertyName("move_speed")]
	public int MoveSpeed { get; init; }

	/// <summary>
	/// Gets the turn rate.
	/// </summary>
	[JsonPropertyName("turn_rate")]
	public double? TurnRate { get; init; }

	/// <summary>
	/// Gets the CM enabled or not. (Idk what it means)
	/// </summary>
	[JsonPropertyName("cm_enabled")]
	public BooleanState? CmEnabled { get; init; }

	/// <summary>
	/// Gets hero's amount of legs.
	/// </summary>
	[JsonPropertyName("legs")]
	public int Legs { get; init; }

	/// <summary>
	/// Gets the day vision.
	/// </summary>
	[JsonPropertyName("day_vision")]
	public int DayVision { get; init; }

	/// <summary>
	/// Gets the night vision.
	/// </summary>
	[JsonPropertyName("night_vision")]
	public int NightVision { get; init; }

	/// <summary>
	/// Gets hero name, e.g. 'Anti-Mage'.
	/// </summary>
	[JsonPropertyName("localized_name")]
	public string LocalizedName { get; init; } = string.Empty;

	/// <summary>
	/// Gets the hero picks by herald.
	/// </summary>
	[JsonPropertyName("1_pick")]
	public int HeraldPicks { get; init; }

	/// <summary>
	/// Gets the hero wins by herald.
	/// </summary>
	[JsonPropertyName("1_win")]
	public int HeraldWins { get; init; }

	/// <summary>
	/// Gets the hero picks by guardian.
	/// </summary>
	[JsonPropertyName("2_pick")]
	public int GuardianPicks { get; init; }

	/// <summary>
	/// Gets the hero wins by guardian.
	/// </summary>
	[JsonPropertyName("2_win")]
	public int GuardianWins { get; init; }

	/// <summary>
	/// Gets the hero picks.
	/// </summary>
	[JsonPropertyName("3_pick")]
	public int CrusaderPicks { get; init; }

	/// <summary>
	/// Gets the hero wins by crusader.
	/// </summary>
	[JsonPropertyName("3_win")]
	public int CrusaderWins { get; init; }

	/// <summary>
	/// Gets the hero picks by archon.
	/// </summary>
	[JsonPropertyName("4_pick")]
	public int ArchonPicks { get; init; }

	/// <summary>
	/// Gets the hero wins by archon.
	/// </summary>
	[JsonPropertyName("4_win")]
	public int ArchonWins { get; init; }

	/// <summary>
	/// Gets the hero picks by legend.
	/// </summary>
	[JsonPropertyName("5_pick")]
	public int LegendPicks { get; init; }

	/// <summary>
	/// Gets the hero wins by legend.
	/// </summary>
	[JsonPropertyName("5_win")]
	public int LegendWins { get; init; }

	/// <summary>
	/// Gets the hero picks by ancient.
	/// </summary>
	[JsonPropertyName("6_pick")]
	public int AncientPicks { get; init; }

	/// <summary>
	/// Gets the hero wins by ancient.
	/// </summary>
	[JsonPropertyName("6_win")]
	public int AncientWins { get; init; }

	/// <summary>
	/// Gets the hero picks by divine.
	/// </summary>
	[JsonPropertyName("7_pick")]
	public int DivinePicks { get; init; }

	/// <summary>
	/// Gets the hero wins by divine.
	/// </summary>
	[JsonPropertyName("7_win")]
	public int DivineWins { get; init; }

	/// <summary>
	/// Gets the hero picks by immortal.
	/// </summary>
	[JsonPropertyName("8_pick")]
	public int ImmortalPicks { get; init; }

	/// <summary>
	///	Gets the hero wins by immortal.
	/// </summary>
	[JsonPropertyName("8_win")]
	public int ImmortalWins { get; init; }

	/// <summary>
	/// Gets the turbo picks.
	/// </summary>
	[JsonPropertyName("turbo_picks")]
	public int TurboPicks { get; init; }

	/// <summary>
	/// Gets the turbo picks trend.
	/// </summary>
	[JsonPropertyName("turbo_picks_trend")]
	public List<int> TurboPicksTrend { get; init; } = [];

	/// <summary>
	/// Gets the turbo wins.
	/// </summary>
	[JsonPropertyName("turbo_wins")]
	public int TurboWins { get; init; }

	/// <summary>
	/// Gets the turbo wins trend.
	/// </summary>
	[JsonPropertyName("turbo_wins_trend")]
	public List<int> TurboWinsTrend { get; init; } = [];

	/// <summary>
	/// Gets the pick count by pro.
	/// </summary>
	[JsonPropertyName("pro_pick")]
	public int ProPick { get; init; }

	/// <summary>
	/// Gets the win count by pro.
	/// </summary>
	[JsonPropertyName("pro_win")]
	public int ProWin { get; init; }

	/// <summary>
	/// Gets the ban count by pro.
	/// </summary>
	[JsonPropertyName("pro_ban")]
	public int ProBan { get; init; }

	/// <summary>
	/// Gets the pub picks.
	/// </summary>
	[JsonPropertyName("pub_pick")]
	public int PubPicks { get; init; }

	/// <summary>
	/// Gets the pub picks trend.
	/// </summary>
	[JsonPropertyName("pub_pick_trend")]
	public List<int> PubPicksTrend { get; init; } = [];

	/// <summary>
	/// Gets the pub wins.
	/// </summary>
	[JsonPropertyName("pub_win")]
	public int PubWins { get; init; }

	/// <summary>
	/// Gets the pub wins trend.
	/// </summary>
	[JsonPropertyName("pub_win_trend")]
	public List<int> PubWinsTrend { get; init; } = [];
}
