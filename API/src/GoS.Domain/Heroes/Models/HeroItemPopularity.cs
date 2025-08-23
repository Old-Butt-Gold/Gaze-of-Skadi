using System.Text.Json.Serialization;

namespace GoS.Domain.Heroes.Models;

/// <summary>
/// Represents a hero item popularity.
/// </summary>
public class HeroItemPopularity
{
	/// <summary>
	/// The start game items popularity
	/// </summary>
	[JsonPropertyName("start_game_items")]
	public Dictionary<string, int> StartGameItems { get; init; } = new();

	/// <summary>
	/// The early game items popularity
	/// </summary>
	[JsonPropertyName("early_game_items")]
	public Dictionary<string, int> EarlyGameItems { get; init; } = new();

	/// <summary>
	/// The mid game items popularity
	/// </summary>
	[JsonPropertyName("mid_game_items")]
	public Dictionary<string, int> MidGameItems { get; init; } = new();

	/// <summary>
	/// The late game items popularity
	/// </summary>
	[JsonPropertyName("late_game_items")]
	public Dictionary<string, int> LateGameItems { get; init; } = new();
}
