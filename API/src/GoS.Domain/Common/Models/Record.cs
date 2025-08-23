using System.Text.Json.Serialization;

namespace GoS.Domain.Common.Models;

public class Record
{
	/// <summary>
	/// Gets ID used to identify individual matches, e.g. 3703866531.
	/// </summary>
	[JsonPropertyName("match_id")]
	public long MatchId { get; init; }

	/// <summary>
	/// Gets the start time of the match.
	/// </summary>
	[JsonPropertyName("start_time")]
	public long StartTime { get; init; }

	/// <summary>
	/// Gets the ID value of the hero played.
	/// </summary>
	[JsonPropertyName("hero_id")]
	public int? HeroId { get; init; }

	/// <summary>
	/// Gets the score of the player.
	/// </summary>
	[JsonPropertyName("score")]
	public long Score { get; init; }
}
