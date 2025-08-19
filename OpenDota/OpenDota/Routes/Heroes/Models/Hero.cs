using System.Text.Json.Serialization;
using OpenDota.Enums;
using OpenDota.Enums.Changeable;
using OpenDota.Enums.Permanent;

namespace OpenDota.Routes.Heroes.Models;

/// <summary>
/// Represents a hero.
/// </summary>
public class Hero
{
	/// <summary>
	/// Gets numeric identifier for the hero object.
	/// </summary>
	[JsonPropertyName("id")]
	public long Id { get; init; }

	/// <summary>
	/// Gets dota hero command name, e.g. 'npc_dota_hero_antimage'.
	/// </summary>
	[JsonPropertyName("name")]
	public string Name { get; init; } = string.Empty;

	/// <summary>
	/// Gets hero name, e.g. 'Anti-Mage'.
	/// </summary>
	[JsonPropertyName("localized_name")]
	public string LocalizedName { get; init; } = string.Empty;

	/// <summary>
	/// Gets hero primary shorthand attribute name, e.g. 'agi'.
	/// </summary>
	[JsonPropertyName("primary_attr")]
	public HeroPrimaryAttribute PrimaryAttribute { get; init; }

	/// <summary>
	/// Gets hero attack type, either 'Melee' or 'Ranged'.
	/// </summary>
	[JsonPropertyName("attack_type")]
	public HeroAttackType HeroAttackType { get; init; }

	/// <summary>
	/// Gets hero's role in the game.
	/// </summary>
	[JsonPropertyName("roles")]
	public List<HeroRole> Roles { get; init; } = [];

	/// <summary>
	/// Gets hero's amount of legs.
	/// </summary>
	[JsonPropertyName("legs")]
	public int Legs { get; init; }
}
