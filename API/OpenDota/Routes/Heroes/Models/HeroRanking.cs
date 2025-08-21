using System.Text.Json.Serialization;

namespace OpenDota.Routes.Heroes.Models;

/// <summary>
/// Represents a hero ranking.
/// </summary>
public class HeroRanking
{
	/// <summary>
	/// Gets the ID value of the hero played.
	/// </summary>
	[JsonPropertyName("hero_id")]
	public long HeroId { get; init; }

	/// <summary>
	/// Gets the rankings of the hero.
	/// </summary>
	[JsonPropertyName("rankings")]
	public List<RankingPlayer> Rankings { get; init; } = [];
}
