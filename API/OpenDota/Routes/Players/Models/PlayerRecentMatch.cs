using System.Text.Json.Serialization;
using OpenDota.Enums;
using OpenDota.Enums.Changeable;
using OpenDota.Enums.Permanent;

namespace OpenDota.Routes.Players.Models;

/// <summary>
/// Represents a player's recent match
/// </summary>

public class PlayerRecentMatch
{
	/// <summary>
	/// Gets ID used to identify individual matches, e.g. 3703866531.
	/// </summary>
	[JsonPropertyName("match_id")]
	public long MatchId { get; init; }

	/// <summary>
	/// Gets which slot the player is in. 0-127 are Radiant, 128-255 are Dire.
	/// </summary>
	[JsonPropertyName("player_slot")]
	public PlayerSlot PlayerSlot { get; init; }

	/// <summary>
	/// Gets boolean indicating whether Radiant won the match
	/// </summary>
	[JsonPropertyName("radiant_win")]
	public BooleanState RadiantWin { get; init; }

	/// <summary>
	/// Gets duration of the game in seconds
	/// </summary>
	[JsonPropertyName("duration")]
	public int Duration { get; init; }

	/// <summary>
	/// Gets an integer corresponding to game mode played.
	/// List of constants can be found here: https://github.com/odota/dotaconstants/blob/master/json/game_mode.json.
	/// </summary>
	[JsonPropertyName("game_mode")]
	public GameMode GameMode { get; init; }

	/// <summary>
	/// Gets integer corresponding to lobby type of match.
	/// List of constants can be found here: https://github.com/odota/dotaconstants/blob/master/json/lobby_type.json.
	/// </summary>
	[JsonPropertyName("lobby_type")]
	public LobbyType LobbyType { get; init; }

	/// <summary>
	/// Gets the ID value of the hero played.
	/// </summary>
	[JsonPropertyName("hero_id")]
	public int HeroId { get; init; }

	/// <summary>
	/// Gets start time of the match in seconds elapsed since 1970
	/// </summary>
	[JsonPropertyName("start_time")]
	public long StartTime { get; init; }

	/// <summary>
	/// Gets total kills the player had at the end of the match
	/// </summary>
	[JsonPropertyName("kills")]
	public int Kills { get; init; }

	/// <summary>
	/// Gets total deaths the player had at the end of the match
	/// </summary>
	[JsonPropertyName("deaths")]
	public int Deaths { get; init; }

	/// <summary>
	/// Gets total assists the player had at the end of the match
	/// </summary>
	[JsonPropertyName("assists")]
	public int Assists { get; init; }

	/// <summary>
	/// Gets skill bracket assigned by Valve (Normal, High, Very High)
	/// </summary>
	[JsonPropertyName("skill")]
	public int Skill { get; init; }

	/// <summary>
	/// Gets average experience per minute
	/// </summary>
	[JsonPropertyName("xp_per_min")]
	public int XpPerMin { get; init; }

	/// <summary>
	/// Gets average gold per minute
	/// </summary>
	[JsonPropertyName("gold_per_min")]
	public int GoldPerMin { get; init; }

	/// <summary>
	/// Gets total amount of hero damage dealt by the player
	/// </summary>
	[JsonPropertyName("hero_damage")]
	public int HeroDamage { get; init; }

	/// <summary>
	/// Gets total amount of tower damage dealt by the player
	/// </summary>
	[JsonPropertyName("tower_damage")]
	public int TowerDamage { get; init; }

	/// <summary>
	/// Gets total amount of healing provided by the player
	/// </summary>
	[JsonPropertyName("hero_healing")]
	public int HeroHealing { get; init; }

	/// <summary>
	/// Gets total amounts of last hits
	/// </summary>
	[JsonPropertyName("last_hits")]
	public int LastHits { get; init; }

	/// <summary>
	/// Gets integer corresponding to which lane the player laned in for the match
	/// </summary>
	[JsonPropertyName("lane")]
	public LaneRole? Lane { get; init; }

	/// <summary>
	/// Gets lane role
	/// </summary>
	[JsonPropertyName("lane_role")]
	public LaneRole? LaneRole { get; init; }

	/// <summary>
	/// Gets boolean describing whether or not the player roamed
	/// </summary>
	[JsonPropertyName("is_roaming")]
	public BooleanState? IsRoaming { get; init; }

	/// <summary>
	/// Gets cluster
	/// </summary>
	[JsonPropertyName("cluster")]
	public int Cluster { get; init; }

	/// <summary>
	/// Gets integer describing whether or not the player left the game. 0: didn't leave. 1: left safely. 2+: Abandoned
	/// </summary>
	[JsonPropertyName("leaver_status")]
	public LeaverStatus LeaverStatus { get; init; }

	/// <summary>
	/// Gets size of the players party. If not in a party, will return 1.
	/// </summary>
	[JsonPropertyName("party_size")]
	public int? PartySize { get; init; }

	/// <summary>
	/// Gets the average rank of the player
	/// </summary>
	[JsonPropertyName("average_rank")]
	public Rank? AverageRank { get; init; }

	/// <summary>
	/// Gets the hero variant. 1-indexed facet, see https://github.com/odota/dotaconstants/blob/master/build/hero_abilities.json
	/// </summary>
	[JsonPropertyName("hero_variant")]
	public int HeroVariant { get; init; }
}
