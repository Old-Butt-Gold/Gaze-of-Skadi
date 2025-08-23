using System.Text.Json.Serialization;

namespace GoS.Domain.Heroes.Models;

/// <summary>
/// Represents a hero matchup.
/// </summary>
public class HeroMatchup
{
	/// <summary>
	/// Gets the ID value of the hero played.
	/// </summary>
	[JsonPropertyName("hero_id")]
	public long HeroId { get; init; }

	/// <summary>
	/// Gets number of games played.
	/// </summary>
	[JsonPropertyName("games_played")]
	public long GamesPlayed { get; init; }

	/// <summary>
	/// Gets number of wins.
	/// </summary>
	[JsonPropertyName("wins")]
	public long Wins { get; init; }
}
