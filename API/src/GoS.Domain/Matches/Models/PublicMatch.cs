using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;

namespace GoS.Domain.Matches.Models;

/// <summary>
/// Represents a public match.
/// </summary>
public class PublicMatch
{
	/// <summary>
	/// Gets ID used to identify individual matches, e.g. 3703866531.
	/// </summary>
	[JsonPropertyName("match_id")]
	public long MatchId { get; init; }

	/// <summary>
	/// Gets integer corresponding to match sequence number.
	/// </summary>
	[JsonPropertyName("match_seq_num")]
	public long MatchSeqNum { get; init; }

	/// <summary>
	/// Gets boolean corresponding to whether radiant won.
	/// </summary>
	[JsonPropertyName("radiant_win")]
	public BooleanState RadiantWin { get; init; }

	/// <summary>
	/// Gets start time of match.
	/// </summary>
	[JsonPropertyName("start_time")]
	public long StartTime { get; init; }

	/// <summary>
	/// Gets duration of match.
	/// </summary>
	[JsonPropertyName("duration")]
	public int Duration { get; init; }

	/// <summary>
	/// Gets lobby type of match.
	/// List of constants can be found here: https://github.com/odota/dotaconstants/blob/master/json/lobby_type.json.
	/// </summary>
	[JsonPropertyName("lobby_type")]
	public LobbyType LobbyType { get; init; }

	/// <summary>
	/// Gets game mode played.
	/// List of constants can be found here: https://github.com/odota/dotaconstants/blob/master/json/game_mode.json.
	/// </summary>
	[JsonPropertyName("game_mode")]
	public GameMode GameMode { get; init; }

	/// <summary>
	/// Gets average rank tier of players in the match.
	/// </summary>
	[JsonPropertyName("avg_rank_tier")]
	public Rank AvgRankTier { get; init; }

	/// <summary>
	/// Gets number of rank tiers in the match.
	/// </summary>
	[JsonPropertyName("num_rank_tier")]
	public int NumRankTier { get; init; }

	/// <summary>
	/// Gets cluster of match.
	/// </summary>
	[JsonPropertyName("cluster")]
	public int Cluster { get; init; }

	/// <summary>
	/// Gets a list of player IDs in the radiant team.
	/// </summary>
	[JsonPropertyName("radiant_team")]
	public List<int> RadiantTeam { get; init; }

	/// <summary>
	/// Gets a list of player IDs in the dire team.
	/// </summary>
	[JsonPropertyName("dire_team")]
	public List<int> DireTeam { get; init; }
}


