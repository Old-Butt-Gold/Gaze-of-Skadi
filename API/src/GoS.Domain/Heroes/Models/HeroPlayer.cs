using System.Text.Json.Serialization;

namespace GoS.Domain.Heroes.Models;

/// <summary>
/// Represents a hero player.
/// </summary>
public class HeroPlayer
{
	/// <summary>
	/// Gets account ID of the player.
	/// </summary>
	[JsonPropertyName("account_id")]

	public long AccountId { get; init; }

	/// <summary>
	/// Gets number of games played on the hero.
	/// </summary>
	[JsonPropertyName("games_played")]

	public long GamesPlayed { get; init; }

	/// <summary>
	/// Gets number of games won.
	/// </summary>
	[JsonPropertyName("wins")]

	public long Wins { get; init; }
}
