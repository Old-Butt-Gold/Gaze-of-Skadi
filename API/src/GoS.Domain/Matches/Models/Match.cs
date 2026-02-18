using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;
using GoS.Domain.Common.Models;
using GoS.Domain.Matches.Enums;

namespace GoS.Domain.Matches.Models;

/// <summary>
/// Represents a match
/// </summary>
public class Match
{
	/// <summary>
	/// Gets ID used to identify individual matches, e.g. 3703866531.
	/// </summary>
	[JsonPropertyName("match_id")]
	public long MatchId { get; init; }

	/// <summary>
	/// Gets the bitmask. An integer that represents a binary of which barracks are still standing. 63 would mean all barracks still stand at the end of the game.
	/// </summary>
	[JsonPropertyName("barracks_status_dire")]
	public BarracksStatus BarracksStatusDire { get; init; }

	/// <summary>
	/// Gets the bitmask. An integer that represents a binary of which barracks are still standing. 63 would mean all barracks still stand at the end of the game.
	/// </summary>
	[JsonPropertyName("barracks_status_radiant")]
	public BarracksStatus BarracksStatusRadiant { get; init; }

	/// <summary>
	/// Gets chat logs
	/// </summary>
	[JsonPropertyName("chat")]
	public List<Chat> Chat { get; init; } = [];

	/// <summary>
	/// Gets the number of kills of dire team
	/// </summary>
	[JsonPropertyName("dire_score")]
	public int DireScore { get; init; }

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
	/// Gets game objectives
	/// </summary>
	[JsonPropertyName("objectives")]
	public List<Objective> Objectives { get; init; } = [];

	/// <summary>
	/// Gets object containing information on the draft. Each pick/ban contains a boolean relating to whether the choice is a pick or a ban, the hero ID, the team the picked or banned it, and the order
	/// </summary>
	[JsonPropertyName("picks_bans")]
	public List<PickBan> PicksBans { get; init; } = [];

	/// <summary>
	/// Gets array of the Radiant gold advantage at each minute in the game. A negative number means that Radiant is behind, and thus it is their gold disadvantage.
	/// </summary>
	[JsonPropertyName("radiant_gold_adv")]
	public List<int> RadiantGoldAdvantage { get; init; } = [];

	/// <summary>
	/// Gets final score for Radiant (number of kills on Radiant)
	/// </summary>
	[JsonPropertyName("radiant_score")]
	public int RadiantScore { get; init; }

	/// <summary>
	/// Gets boolean indicating whether Radiant won the match
	/// </summary>
	[JsonPropertyName("radiant_win")]
	public BooleanState? RadiantWin { get; init; }

	/// <summary>
	/// Gets array of the Radiant experience advantage at each minute in the game. A negative number means that Radiant is behind, and thus it is their experience disadvantage.
	/// </summary>
	[JsonPropertyName("radiant_xp_adv")]
	public List<int> RadiantXpAdvantage { get; init; } = [];

	/// <summary>
	/// Gets the Unix timestamp at which the game started.
	/// </summary>
	[JsonPropertyName("start_time")]
	public long StartTime { get; init; }

	/// <summary>
	/// Gets the detailed list of teamfights.
	/// </summary>
	[JsonPropertyName("teamfights")]
	public List<Teamfight> Teamfights { get; init; } = [];

	/// <summary>
	/// Gets the bitmask. An integer that represents a binary of which Dire towers are still standing.
	/// </summary>
	[JsonPropertyName("tower_status_dire")]
	public TowerStatus TowerStatusDire { get; init; }

	/// <summary>
	/// Gets the bitmask. An integer that represents a binary of which Radiant towers are still standing.
	/// </summary>
	[JsonPropertyName("tower_status_radiant")]
	public TowerStatus TowerStatusRadiant { get; init; }

	/// <summary>
	/// Gets parse version, used internally by OpenDota
	/// </summary>
	[JsonPropertyName("version")]
	public int? Version { get; init; }

	/// <summary>
	/// Gets information about the league (if any)
	/// </summary>
	[JsonPropertyName("league")]
	public League? League { get; init; }

	/// <summary>
	/// Gets Radiant team information
	/// </summary>
	[JsonPropertyName("radiant_team")]
	public MatchTeam? RadiantTeam { get; init; }

	/// <summary>
	/// Gets Dire team information
	/// </summary>
	[JsonPropertyName("dire_team")]
	public MatchTeam? DireTeam { get; init; }

	/// <summary>
	/// Gets array of information on individual players
	/// </summary>
	[JsonPropertyName("players")]
	public List<MatchPlayer> Players { get; init; } = [];

	/// <summary>
	/// Gets information on the patch version the game is played on
	/// </summary>
	[JsonPropertyName("patch")]
	public Patch Patch { get; init; }

	/// <summary>
	/// Gets the integer corresponding to the region the game was played on.
	/// </summary>
	[JsonPropertyName("region")]
	public Region Region { get; init; }

	/// <summary>
	/// Gets the replay URL.
	/// </summary>
	[JsonPropertyName("replay_url")]
	public Uri? ReplayUrl { get; init; }

    /// <summary>
    /// Величина "закинутого" преимущества. Максимальное золото, которое вела проигравшая команда перед тем, как проиграть.
    /// </summary>
    [JsonPropertyName("throw")]
    public int? Throw { get; init; }

    /// <summary>
    /// Величина камбэка. Максимальное отставание по золоту, которое успешно отыграла победившая команда.
    /// </summary>
    [JsonPropertyName("comeback")]
    public int? Comeback { get; init; }

    /// <summary>
    /// Глубина поражения. Максимальное отставание по золоту, зафиксированное у проигравшей команды в любой момент игры.
    /// </summary>
    [JsonPropertyName("loss")]
    public int? Loss { get; init; }

    /// <summary>
    /// Степень доминации (разгром). Максимальное преимущество по золоту, которого достигла победившая команда.
    /// </summary>
    [JsonPropertyName("stomp")]
    public int? Stomp { get; init; }
}
