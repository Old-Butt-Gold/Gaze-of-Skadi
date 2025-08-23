using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;

namespace GoS.Domain.Players.Models;

/// <summary>
/// Represents player count.
/// </summary>
public class PlayerCount
{
	/// <summary>
	/// Gets integer describing whether or not the player left the game. 0: didn't leave. 1: left safely. 2+: Abandoned.
	/// </summary>
	[JsonPropertyName("leaver_status")]
	public Dictionary<LeaverStatus, PlayerCountStats> LeaverStatus { get; init; } = new();

	/// <summary>
	/// Gets integer corresponding to game mode played.
	/// List of constants can be found here: https://github.com/odota/dotaconstants/blob/master/json/game_mode.json.
	/// </summary>
	[JsonPropertyName("game_mode")]
	public Dictionary<GameMode, PlayerCountStats> GameMode { get; init; } = new();

	/// <summary>
	/// Gets integer corresponding to lobby type of match.
	/// List of constants can be found here: https://github.com/odota/dotaconstants/blob/master/json/lobby_type.json.
	/// </summary>
	[JsonPropertyName("lobby_type")]
	public Dictionary<LobbyType, PlayerCountStats> LobbyType { get; init; } = new();

	/// <summary>
	/// Gets lane_role.
	/// </summary>
	[JsonPropertyName("lane_role")]
	public Dictionary<LaneRole, PlayerCountStats> LaneRole { get; init; } = new();

	/// <summary>
	/// Gets integer corresponding to the region the game was played on.
	/// </summary>
	[JsonPropertyName("region")]
	public Dictionary<Region, PlayerCountStats> Region { get; init; } = new();

	/// <summary>
	/// Gets patch.
	/// </summary>
	[JsonPropertyName("patch")]
	public Dictionary<Patch, PlayerCountStats> Patch { get; init; } = new();

	/// <summary>
	/// Gets radiant/dire stats.
	/// </summary>
	[JsonPropertyName("is_radiant")]
	public Dictionary<Team, PlayerCountStats> IsRadiant { get; init; } = new();
}
