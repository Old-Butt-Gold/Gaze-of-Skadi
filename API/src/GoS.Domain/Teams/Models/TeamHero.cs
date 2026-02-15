using System.Text.Json.Serialization;

namespace GoS.Domain.Teams.Models;

/// <summary>
/// Represents a team hero.
/// </summary>
public class TeamHero
{
	/// <summary>
	/// Gets the ID value of the hero played.
	/// </summary>
	[JsonPropertyName("hero_id")]
	public int HeroId { get; init; }

	/// <summary>
	/// Gets number of games played.
	/// </summary>
	[JsonPropertyName("games_played")]
	public int GamesPlayed { get; init; }

	/// <summary>
	/// Gets number of wins.
	/// </summary>
	[JsonPropertyName("wins")]
	public int Wins { get; init; }
}
