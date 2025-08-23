using System.Text.Json.Serialization;

namespace GoS.Domain.Resources.Enums;

/// <summary>
/// The attack type of the hero.
/// </summary>
public enum HeroAttackType
{
	/// <summary>
	/// The melee attack type.
	/// </summary>
	[JsonPropertyName("Melee")]
    Melee = 1,

	/// <summary>
	/// The ranged attack type.
	/// </summary>
	[JsonPropertyName("Ranged")]
    Ranged = 2,
}
