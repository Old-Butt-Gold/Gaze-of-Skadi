using System.Text.Json.Serialization;

namespace OpenDota.Routes.Heroes.Models;

/// <summary>
/// Represents a hero duration.
/// </summary>
public class HeroDuration
{
	/// <summary>
	/// Gets lower bound
	/// of seconds the match lasted.
	/// </summary>
	[JsonPropertyName("duration_bin")]
	public int DurationBin { get; init; }

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
