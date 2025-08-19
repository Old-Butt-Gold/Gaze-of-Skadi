using System.Text.Json.Serialization;

namespace OpenDota.Routes.Players.Models;

/// <summary>
/// Represents player rating.
/// </summary>
public class PlayerRating
{
	/// <summary>
	/// Gets account ID of the player.
	/// </summary>
	[JsonPropertyName("account_id")]
	public long AccountId { get; init; }

	/// <summary>
	/// Gets ID used to identify individual matches, e.g. 3703866531.
	/// </summary>
	[JsonPropertyName("match_id")]
	public long MatchId { get; init; }

	/// <summary>
	/// Gets solo competitive rank.
	/// </summary>
	[JsonPropertyName("solo_competitive_rank")]
	public int? SoloCompetitiveRank { get; init; }

	/// <summary>
	/// Gets competitive rank.
	/// </summary>
	[JsonPropertyName("competitive_rank")]
	public int? CompetitiveRank { get; init; }

	/// <summary>
	/// Gets time of the rating.
	/// </summary>
	[JsonPropertyName("time")]
	public DateTimeOffset Time { get; init; }
}
