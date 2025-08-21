using System.Text.Json.Serialization;
using OpenDota.Enums.Permanent;

namespace OpenDota.Routes.Teams.Models;

/// <summary>
/// Represents a team match.
/// </summary>
public class TeamMatch
{
	/// <summary>
	/// Gets ID used to identify individual matches, e.g. 3703866531.
	/// </summary>
	[JsonPropertyName("match_id")]
	public long MatchId { get; init; }

	/// <summary>
	/// Gets whether the radiant team won.
	/// </summary>
	[JsonPropertyName("radiant_win")]
	public BooleanState RadiantWin { get; init; }

	/// <summary>
	/// Gets the radiant score
	/// </summary>
	[JsonPropertyName("radiant_score")]
	public int RadiantScore { get; init; }

	/// <summary>
	/// Gets the dire score
	/// </summary>
	[JsonPropertyName("dire_score")]
	public int DireScore { get; init; }

	/// <summary>
	/// Gets whether the radiant team is the winning team.
	/// </summary>
	[JsonPropertyName("radiant")]
	public BooleanState Radiant { get; init; }

	/// <summary>
	/// Gets the duration of the match in seconds.
	/// </summary>
	[JsonPropertyName("duration")]
	public long Duration { get; init; }

	/// <summary>
	/// Gets the start time of the match in unix time.
	/// </summary>
	[JsonPropertyName("start_time")]
	public long StartTime { get; init; }

	/// <summary>
	/// Gets the league ID.
	/// </summary>
	[JsonPropertyName("leagueid")]
	public long LeagueId { get; init; }

	/// <summary>
	/// Gets the league name.
	/// </summary>
	[JsonPropertyName("league_name")]
	public string LeagueName { get; init; } = string.Empty;

	/// <summary>
	/// Gets the cluster ID.
	/// </summary>
	[JsonPropertyName("cluster")]
	public long Cluster { get; init; }

	/// <summary>
	/// Gets the opposing team ID.
	/// </summary>
	[JsonPropertyName("opposing_team_id")]
	public long OpposingTeamId { get; init; }

	/// <summary>
	/// Gets the opposing team name.
	/// </summary>
	[JsonPropertyName("opposing_team_name")]
	public string OpposingTeamName { get; init; } = string.Empty;

	/// <summary>
	/// Gets the opposing team logo.
	/// </summary>
	[JsonPropertyName("opposing_team_logo")]
	public Uri? OpposingTeamLogo { get; init; }
}
