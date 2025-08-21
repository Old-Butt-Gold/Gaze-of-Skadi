using System.Text.Json.Serialization;

namespace OpenDota.Enums.Permanent;

/// <summary>
/// The attack type of the hero.
/// </summary>
public enum HeroAttackType
{
	/// <summary>
	/// None attack type only for internal usage.
	/// </summary>
	[JsonIgnore]
    None = 0,

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
