using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;

namespace GoS.Domain.Heroes.Models;

/// <summary>
/// Contains information about a hero match.
/// </summary>
public class HeroMatch
{
	/// <summary>
	/// Gets ID used to identify individual matches, e.g. 3703866531.
	/// </summary>
	[JsonPropertyName("match_id")]
	public long MatchId { get; init; }

	/// <summary>
	/// Gets Unix timestamp of when the match began.
	/// </summary>
	[JsonPropertyName("start_time")]
	public long StartTime { get; init; }

	/// <summary>
	/// Gets length of the match.
	/// </summary>
	[JsonPropertyName("duration")]
	public long Duration { get; init; }

	/// <summary>
	/// Gets a value indicating whether or not the Radiant won the match.
	/// </summary>
	[JsonPropertyName("radiant_win")]
	public BooleanState RadiantWin { get; init; }

	/// <summary>
	/// Gets identifier for the league the match took place in.
	/// </summary>
	[JsonPropertyName("leagueid")]
	public long LeagueId { get; init; }

	/// <summary>
	/// Gets name of league the match took place in.
	/// </summary>
	[JsonPropertyName("league_name")]
	public string LeagueName { get; init; } = string.Empty;

	/// <summary>
	/// Gets a value indicating whether the team/player/hero was on Radiant.
	/// </summary>
	[JsonPropertyName("radiant")]
	public BooleanState Radiant { get; init; }

	/// <summary>
	/// Gets which slot the player is in. 0-127 are Radiant, 128-255 are Dire.
	/// </summary>
	[JsonPropertyName("player_slot")]
	public PlayerSlot PlayerSlot { get; init; }

	/// <summary>
	/// Gets account ID of the player playing the hero.
	/// </summary>
	[JsonPropertyName("account_id")]
	public long AccountId { get; init; }

	/// <summary>
	/// Gets kills the hero had.
	/// </summary>
	[JsonPropertyName("kills")]
	public long Kills { get; init; }

	/// <summary>
	/// Gets number of deaths the hero had.
	/// </summary>
	[JsonPropertyName("deaths")]
	public long Deaths { get; init; }

	/// <summary>
	/// Gets number of assists the hero had.
	/// </summary>
	[JsonPropertyName("assists")]
	public long Assists { get; init; }
}
