using System.Text.Json.Serialization;
using OpenDota.Enums;
using OpenDota.Enums.Permanent;

namespace OpenDota.Routes.Matches.Models;

/// <summary>
/// Represents a draft timing
/// </summary>
public class DraftTiming
{
	/// <summary>
	/// Gets the order of pick
	/// </summary>
	[JsonPropertyName("order")]
	public int Order { get; init; }

	/// <summary>
	/// Gets whether a hero was picked or not. True if hero was picked, false if hero was banned
	/// </summary>
	[JsonPropertyName("pick")]
	public BooleanState Pick { get; init; }

	/// <summary>
	/// Gets the id of the active team doing the picking
	/// </summary>
	[JsonPropertyName("active_team")]
	public int ActiveTeam { get; init; }

	/// <summary>
	/// Gets the ID value of the hero played.
	/// </summary>
	[JsonPropertyName("hero_id")]
	public int HeroId { get; init; }

	/// <summary>
	/// Gets which slot the player is in. 0-127 are Radiant, 128-255 are Dire. (P.S. Nope, from 0-9 inclusive)
	/// </summary>
	[JsonPropertyName("player_slot")]
	public PlayerSlotSequence? PlayerSlot { get; init; }

	/// <summary>
	/// Gets extra time left
	/// </summary>
	[JsonPropertyName("extra_time")]
	public int ExtraTime { get; init; }

	/// <summary>
	/// Gets total time taken to pick their hero
	/// </summary>
	[JsonPropertyName("total_time_taken")]
	public int TotalTimeTaken { get; init; }
}
