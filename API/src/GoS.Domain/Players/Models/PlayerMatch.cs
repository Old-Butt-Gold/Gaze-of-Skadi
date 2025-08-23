using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;

namespace GoS.Domain.Players.Models;

/// <summary>
/// Represents a player match.
/// </summary>
public class PlayerMatch
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
	/// Gets whether Radiant won the match.
	/// </summary>
	[JsonPropertyName("radiant_win")]
	public BooleanState? RadiantWin { get; init; }

	/// <summary>
	/// Gets the duration of the game in seconds.
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
	/// Gets total kills the player had at the end of the game.
	/// </summary>
	[JsonPropertyName("kills")]
	public int Kills { get; init; }

	/// <summary>
	/// Gets total deaths the player had at the end of the game.
	/// </summary>
	[JsonPropertyName("deaths")]
	public int Deaths { get; init; }

	/// <summary>
	/// Gets total assists the player had at the end of the game.
	/// </summary>
	[JsonPropertyName("assists")]
	public int Assists { get; init; }

	/// <summary>
	/// Gets integer describing whether or not the player left the game. 0: didn't leave. 1: left safely. 2+: Abandoned.
	/// </summary>
	[JsonPropertyName("leaver_status")]
	public LeaverStatus LeaverStatus { get; init; }

	/// <summary>
	/// Gets size of the player's party.
	/// </summary>
	[JsonPropertyName("party_size")]
	public int? PartySize { get; init; }

	[JsonPropertyName("average_rank")]
	public Rank? AverageRank { get; init; }

	/// <summary>
	/// Gets the variant of the hero played. 1-indexed facet, see https://github.com/odota/dotaconstants/blob/master/build/hero_abilities.json
	/// </summary>
	[JsonPropertyName("hero_variant")]
	public int? HeroVariant { get; init; }

	/// <summary>
	/// Gets the heroes.
	/// (requires ?project=heroes).
	/// </summary>
	[JsonPropertyName("heroes")]
	public Dictionary<string, PlayerMatchHero>? Heroes { get; init; }
}
