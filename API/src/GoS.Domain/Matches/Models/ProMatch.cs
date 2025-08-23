using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;

namespace GoS.Domain.Matches.Models;

public class ProMatch
{
	/// <summary>
	/// Gets ID used to identify individual matches, e.g. 3703866531.
	/// </summary>
	[JsonPropertyName("match_id")]
	public long MatchId { get; init; }

	/// <summary>
	/// Gets length of the match.
	/// </summary>
	[JsonPropertyName("duration")]
	public int Duration { get; init; }

	/// <summary>
	/// Gets Unix timestamp of when the match began.
	/// </summary>
	[JsonPropertyName("start_time")]
	public long StartTime { get; init; }

	/// <summary>
	/// Gets the Radiant's team_id.
	/// </summary>
	[JsonPropertyName("radiant_team_id")]
	public long? RadiantTeamId { get; init; }

	/// <summary>
	/// Gets the Radiant's team name.
	/// </summary>
	[JsonPropertyName("radiant_name")]
	public string RadiantName { get; init; } = string.Empty;

	/// <summary>
	/// Gets the Dire's team_id.
	/// </summary>
	[JsonPropertyName("dire_team_id")]
	public long? DireTeamId { get; init; }

	/// <summary>
	/// Gets the Dire's team name.
	/// </summary>
	[JsonPropertyName("dire_name")]
	public string DireName { get; init; } = string.Empty;

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
	/// Gets identifier for the series of the match.
	/// </summary>
	[JsonPropertyName("series_id")]
	public long? SeriesId { get; init; }

	/// <summary>
	/// Gets type of series the match was.
	/// </summary>
	[JsonPropertyName("series_type")]
	public long? SeriesType { get; init; }

	/// <summary>
	/// Gets the number of kills the Radiant team had when the match ended.
	/// </summary>
	[JsonPropertyName("radiant_score")]
	public int RadiantScore { get; init; }

	/// <summary>
	/// Gets the number of kills the Dire team had when the match ended.
	/// </summary>
	[JsonPropertyName("dire_score")]
	public int DireScore { get; init; }

	/// <summary>
	/// Gets a value indicating whether or not the Radiant won the match.
	/// </summary>
	[JsonPropertyName("radiant_win")]
	public BooleanState RadiantWin { get; init; }

	/// <summary>
	/// Gets a value indicating whether the team/player/hero was on Radiant.
	/// </summary>
	public BooleanState Radiant { get; init; }
}
