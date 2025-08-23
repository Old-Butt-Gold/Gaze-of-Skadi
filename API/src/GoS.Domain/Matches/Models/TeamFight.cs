using System.Text.Json.Serialization;

namespace GoS.Domain.Matches.Models;

/// <summary>
/// Represents a teamfight
/// </summary>
public class Teamfight
{
	/// <summary>
	/// Gets the time (in seconds) when the teamfight started
	/// </summary>
	[JsonPropertyName("start")]
	public int Start { get; init; }

	/// <summary>
	/// Gets the time (in seconds) when the teamfight ended
	/// </summary>
	[JsonPropertyName("end")]
	public int End { get; init; }

	/// <summary>
	/// Gets the time (in seconds) when the last death occured in the teamfight
	/// </summary>
	[JsonPropertyName("last_death")]
	public long LastDeath { get; init; }

	/// <summary>
	/// Gets the amount of total deaths during the teamfight
	/// </summary>
	[JsonPropertyName("deaths")]
	public long Deaths { get; init; }

	/// <summary>
	/// Gets the players involved in the teamfight
	/// </summary>
	[JsonPropertyName("players")]
	public List<TeamfightPlayer> Players { get; init; } = [];
}
