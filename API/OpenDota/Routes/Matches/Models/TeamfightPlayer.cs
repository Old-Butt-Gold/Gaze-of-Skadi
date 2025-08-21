using System.Text.Json.Serialization;

namespace OpenDota.Routes.Matches.Models;

/// <summary>
/// Represents a teamfight player
/// </summary>
public class TeamfightPlayer
{
	/// <summary>
	/// Gets a dictionary of the position where the hero died? Only has value if deaths is greater than 0
	/// </summary>
	[JsonPropertyName("deaths_pos")]
	public Dictionary<string, Dictionary<string, int>> DeathsPos { get; init; } = [];

	/// <summary>
	/// Gets a dictionary of the name of abilities used and how many times they were used
	/// </summary>
	[JsonPropertyName("ability_uses")]
	public Dictionary<string, int> AbilityUses { get; init; } = [];

	/// <summary>
	/// Gets a dictionary of the name of items used and how many times they were used
	/// </summary>
	[JsonPropertyName("item_uses")]
	public Dictionary<string, long> ItemUses { get; init; } = [];

	/// <summary>
	/// Gets a dictionary of the heroes killed and how many times they were killed
	/// </summary>
	[JsonPropertyName("killed")]
	public Dictionary<string, long> Killed { get; init; } = [];

	/// <summary>
	/// Gets how many deaths the player got during the teamfight
	/// </summary>
	[JsonPropertyName("deaths")]
	public long Deaths { get; init; }

	/// <summary>
	/// Gets if the player bought back or not
	/// </summary>
	[JsonPropertyName("buybacks")]
	public long Buybacks { get; init; }

	/// <summary>
	/// Gets a total amount of damage
	/// </summary>
	[JsonPropertyName("damage")]
	public long Damage { get; init; }

	/// <summary>
	/// Gets a total amount of healing
	/// </summary>
	[JsonPropertyName("healing")]
	public long Healing { get; init; }

	/// <summary>
	/// Gets a gold gained from the teamfight
	/// </summary>
	[JsonPropertyName("gold_delta")]
	public long GoldDelta { get; init; }

	/// <summary>
	/// Gets an experience gained from the teamfight
	/// </summary>
	[JsonPropertyName("xp_delta")]
	public long XpDelta { get; init; }
}
