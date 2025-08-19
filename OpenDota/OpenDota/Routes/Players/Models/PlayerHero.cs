using System.Text.Json.Serialization;

namespace OpenDota.Routes.Players.Models;

/// <summary>
/// Represents player hero.
/// </summary>
public class PlayerHero
{
	/// <summary>
	/// Gets the ID value of the hero played.
	/// </summary>
	[JsonPropertyName("hero_id")]
	public int HeroId { get; init; }

	/// <summary>
	/// Gets the last time the hero was played.
	/// </summary>
	[JsonPropertyName("last_played")]
	public long LastPlayed { get; init; }

	/// <summary>
	/// Gets the number of games played.
	/// </summary>
	[JsonPropertyName("games")]
	public int Games { get; init; }

	/// <summary>
	///	Gets the number of wins.
	/// </summary>
	[JsonPropertyName("win")]
	public int Win { get; init; }

	/// <summary>
	/// Gets the number of games played with the hero.
	/// </summary>
	[JsonPropertyName("with_games")]
	public int WithGames { get; init; }

	/// <summary>
	/// Gets the number of wins with the hero.
	/// </summary>
	[JsonPropertyName("with_win")]
	public int WithWin { get; init; }

	/// <summary>
	///	Gets the number of games played against the hero.
	/// </summary>
	[JsonPropertyName("against_games")]
	public int AgainstGames { get; init; }

	/// <summary>
	/// Gets the number of wins against the hero.
	/// </summary>
	[JsonPropertyName("against_win")]
	public int AgainstWin { get; init; }
}
