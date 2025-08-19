using System.Text.Json.Serialization;

namespace OpenDota.Routes.Players.Models;

/// <summary>
/// Represents player match hero.
/// </summary>
public class PlayerMatchHero
{
	/// <summary>
	/// Gets account ID of the player.
	/// </summary>
	[JsonPropertyName("account_id")]
	public long? AccountId { get; init; }

	/// <summary>
	/// Gets the ID value of the hero played.
	/// </summary>
	[JsonPropertyName("hero_id")]
	public long HeroId { get; init; }

	/// <summary>
	/// Gets which slot the player is in. 0-127 are Radiant, 128-255 are Dire.
	/// </summary>
	[JsonPropertyName("player_slot")]
	public long PlayerSlot { get; init; }
}
