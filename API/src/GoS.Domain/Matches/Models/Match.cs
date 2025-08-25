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
	/// Gets cluster
	/// </summary>
	[JsonPropertyName("cluster")]
	public int Cluster { get; init; }

	/// <summary>
	/// Gets cosmetics
	/// </summary>
	[JsonPropertyName("cosmetics")]
	public Dictionary<string, PlayerSlot> Cosmetics { get; init; } = [];

	/// <summary>
	/// Gets the number of kills of dire team
	/// </summary>
	[JsonPropertyName("dire_score")]
	public int DireScore { get; init; }

	/// <summary>
	/// Gets the ID of dire team
	/// </summary>
	[JsonPropertyName("dire_team_id")]
	public int? DireTeamId { get; init; }

	/// <summary>
	/// Gets draft (pick) timings and info
	/// </summary>
	[JsonPropertyName("draft_timings")]
	public List<DraftTiming> DraftTimings { get; init; } = [];

	/// <summary>
	/// Gets duration of the game in seconds
	/// </summary>
	[JsonPropertyName("duration")]
	public int Duration { get; init; }

	/// <summary>
	/// Gets the ID of radiant team
	/// </summary>
	[JsonPropertyName("engine")]
	public int Engine { get; init; }

	/// <summary>
	/// Gets the time (in seconds) of game when first blood was drawn
	/// </summary>
	[JsonPropertyName("first_blood_time")]
	public long? FirstBloodTime { get; init; }

	/// <summary>
	/// Gets an integer corresponding to game mode played.
	/// List of constants can be found here: https://github.com/odota/dotaconstants/blob/master/json/game_mode.json.
	/// </summary>
	[JsonPropertyName("game_mode")]
	public GameMode GameMode { get; init; }

	/// <summary>
	/// Gets number of human players in the game
	/// </summary>
	[JsonPropertyName("human_players")]
	public int HumanPlayers { get; init; }

	/// <summary>
	/// Gets the ID of league
	/// </summary>
	[JsonPropertyName("leagueid")]
	public int LeagueId { get; init; }

	/// <summary>
	/// Gets integer corresponding to lobby type of match.
	/// List of constants can be found here: https://github.com/odota/dotaconstants/blob/master/json/lobby_type.json.
	/// </summary>
	[JsonPropertyName("lobby_type")]
	public LobbyType LobbyType { get; init; }

	/// <summary>
	/// Gets the match sequence number
	/// </summary>
	[JsonPropertyName("match_seq_num")]
	public long MatchSeqNum { get; init; }

	/// <summary>
	/// Gets number of negative votes the replay received in the in-game client
	/// </summary>
	[JsonPropertyName("negative_votes")]
	public long NegativeVotes { get; init; }

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
	/// Gets number of positive votes the replay received in the in-game client
	/// </summary>
	[JsonPropertyName("positive_votes")]
	public int PositiveVotes { get; init; }

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
	/// Gets ID of the Radiant team
	/// </summary>
	[JsonPropertyName("radiant_team_id")]
	public int? RadiantTeamId { get; init; }

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
	/// TODO if match parsed or not. if not then it's null
	[JsonPropertyName("version")]
	public int? Version { get; init; }

	/// <summary>
	/// Gets salt of the replay file.
	/// </summary>
	[JsonPropertyName("replay_salt")]
	public long? ReplaySalt { get; init; }

	/// <summary>
	/// Gets the series ID
	/// </summary>
	[JsonPropertyName("series_id")]
	public long SeriesId { get; init; }

	/// <summary>
	/// Gets the series type
	/// </summary>
	[JsonPropertyName("series_type")]
	public long SeriesType { get; init; }

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
	/// Gets word counts of the all chat messages in the player's games (string - message, int - amount of times used).
	/// </summary>
	[JsonPropertyName("all_word_counts")]
	public Dictionary<string, int> AllWordCounts { get; init; } = new();

	/// <summary>
	/// Gets word counts of the player's all chat messages
	/// </summary>
	[JsonPropertyName("my_word_counts")]
	public Dictionary<string, int> MyWordCounts { get; init; } = new();

	/// <summary>
	/// Gets the maximum gold advantage of the player's team if they lost the match.
	/// </summary>
	[JsonPropertyName("throw")]
	public int Throw { get; init; }

	/// <summary>
	/// Gets the maximum gold disadvantage of the player's team if they won the match.
	/// </summary>
	[JsonPropertyName("comeback")]
	public int Comeback { get; init; }

	/// <summary>
	/// Gets the maximum gold disadvantage of the player's team if they lost the match.
	/// </summary>
	[JsonPropertyName("loss")]
	public int Loss { get; init; }

	/// <summary>
	/// Gets the maximum gold advantage of the player's team if they won the match.
	/// </summary>
	[JsonPropertyName("win")]
	public int Win { get; init; }

	/// <summary>
	/// Gets the replay URL.
	/// </summary>
	[JsonPropertyName("replay_url")]
	public Uri? ReplayUrl { get; init; }
}
