using System.Text.Json.Serialization;

namespace GoS.Domain.Common.Models;

/// <summary>
/// Represents the timing of an item.
/// </summary>
public class ItemTiming
{
	/// <summary>
	/// Gets the ID value of the hero played.
	/// </summary>
	[JsonPropertyName("hero_id")]
	public int HeroId { get; init; }

	/// <summary>
	/// Gets the name of the item.
	/// </summary>
	[JsonPropertyName("item")]
	public string Item { get; init; } = string.Empty;

	/// <summary>
	/// Gets the timing of the item.
	/// </summary>
	[JsonPropertyName("time")]
	public int Time { get; init; }

	/// <summary>
	/// Gets the number of games played.
	/// </summary>
	[JsonPropertyName("games")]
	public int Games { get; init; }

	/// <summary>
	/// Gets the number of wins.
	/// </summary>
	[JsonPropertyName("wins")]
	public int Wins { get; init; }
}
