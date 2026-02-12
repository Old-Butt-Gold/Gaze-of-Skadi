using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;

namespace GoS.Domain.Players.Models;

/// <summary>
/// Represents a player record.
/// </summary>
public class PlayerRecord
{
	/// <summary>
	/// Gets ID used to identify individual matches, e.g. 3703866531.
	/// </summary>
	[JsonPropertyName("match_id")]
	public long MatchId { get; init; }

    [JsonPropertyName("average_rank")]
    public int? AverageRank { get; init; }

    /// <summary>
    /// Gets parse version, used internally by OpenDota
    /// </summary>
    /// TODO if match parsed or not. if not then it's null
    [JsonPropertyName("version")]
    public int? Version { get; init; }

	/// <summary>
	/// Gets which slot the player is in. 0-127 are Radiant, 128-255 are Dire.
	/// </summary>
	[JsonPropertyName("player_slot")]
	public int PlayerSlot { get; init; }

	/// <summary>
	/// Gets whether Radiant won the match.
	/// </summary>
	[JsonPropertyName("radiant_win")]
	public BooleanState? RadiantWin { get; init; }

	/// <summary>
	/// Gets an integer corresponding to game mode played.
	/// List of constants can be found here: https://github.com/odota/dotaconstants/blob/master/json/game_mode.json.
	/// </summary>
	[JsonPropertyName("game_mode")]
	public GameMode GameMode { get; init; }

	/// <summary>
	/// Gets an integer corresponding to lobby type of match.
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
	/// Gets time the game started in seconds since 1970.
	/// </summary>
	[JsonPropertyName("start_time")]
	public long StartTime { get; init; }

	/// <summary>
	/// Gets integer describing whether or not the player left the game. 0: didn't leave. 1: left safely. 2+: Abandoned.
	/// </summary>
	[JsonPropertyName("leaver_status")]
	public LeaverStatus LeaverStatus { get; init; }

	/// <summary>
	/// Gets the variant of the hero played. 1-indexed facet, see https://github.com/odota/dotaconstants/blob/master/build/hero_abilities.json
	/// </summary>
	[JsonPropertyName("hero_variant")]
	public int? HeroVariant { get; init; }

    /// <summary>
    /// Gets the party size
    /// </summary>
    [JsonPropertyName("party_size")]
    public int? PartySize { get; init; }

    [JsonExtensionData]
    public Dictionary<string, object> RecordFields { get; set; } = [];
}
