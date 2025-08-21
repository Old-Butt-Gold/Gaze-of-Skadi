using System.Text.Json.Serialization;

namespace OpenDota.Routes.Players.Models;

/// <summary>
/// Represents a player's hero ranking
/// </summary>
public class PlayerHeroRanking
{
	/// <summary>
	/// Gets the ID value of the hero played.
	/// </summary>
	[JsonPropertyName("hero_id")]
	public long HeroId { get; init; }

	/// <summary>
	/// Gets the score of the hero played.
	/// </summary>
	[JsonPropertyName("score")]
	public double Score { get; init; }

	/// <summary>
	/// Gets the percent rank of the hero played.
	/// </summary>
	[JsonPropertyName("percent_rank")]
	public double PercentRank { get; init; }

	/// <summary>
	/// Gets the card value of the hero played.
	/// </summary>
	[JsonPropertyName("card")]
	public long Card { get; init; }
}
