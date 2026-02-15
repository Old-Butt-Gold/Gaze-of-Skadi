using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;
using GoS.Domain.Matches.Enums;

namespace GoS.Domain.Matches.Models;

/// <summary>
/// Represents a match player
/// </summary>
public class MatchPlayer
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
	/// Gets object containing information on who the player used their abilities on
	/// f.e. tidehunter's gush with aghanim
	/// </summary>
	[JsonPropertyName("ability_targets")]
	public Dictionary<string, Dictionary<string, int>> AbilityTargets { get; init; } = new();

	/// <summary>
	/// Gets a list describing how abilities were upgraded
	/// </summary>
	[JsonPropertyName("ability_upgrades_arr")]
	public List<int> AbilityUpgradesArr { get; init; } = [];

	/// <summary>
	/// Gets object containing information on how many times the played used their abilities
	/// </summary>
	[JsonPropertyName("ability_uses")]
	public Dictionary<string, int> AbilityUses { get; init; } = new();

	/// <summary>
	/// Gets account ID of the player.
	/// </summary>
	// Can be null if stream profile is closed
	[JsonPropertyName("account_id")]
	public long? AccountId { get; init; }

	/// <summary>
	/// Gets object containing information on how many and what type of actions the player issued to their hero
	/// </summary>
	[JsonPropertyName("actions")]
	public Dictionary<UnitOrder, long> Actions { get; init; } = new();

	/// <summary>
	/// Gets number of assists the player had
	/// </summary>
	[JsonPropertyName("assists")]
	public long Assists { get; init; }

	/// <summary>
	/// Gets item in backpack slot 0
	/// </summary>
	[JsonPropertyName("backpack_0")]
	public long Backpack0 { get; init; }

	/// <summary>
	/// Gets item in backpack slot 1
	/// </summary>
	[JsonPropertyName("backpack_1")]
	public long Backpack1 { get; init; }

	/// <summary>
	/// Gets item in backpack slot 2
	/// </summary>
	[JsonPropertyName("backpack_2")]
	public long Backpack2 { get; init; }

    /// <summary>
    /// Gets the neutral item
    /// </summary>
    [JsonPropertyName("item_neutral")]
    public int ItemNeutral { get; init; }

    /// <summary>
    /// Gets the neutral aura
    /// </summary>
    [JsonPropertyName("item_neutral2")]
    public int? ItemNeutralAura { get; init; }

    [JsonPropertyName("neutral_item_history")]
    public List<NeutralItemHistory>? NeutralItemHistory { get; init; }

	/// <summary>
	/// Gets array containing information about buybacks
	/// </summary>
	[JsonPropertyName("buyback_log")]
	public List<BuybackLog> BuybackLogs { get; init; } = [];

	/// <summary>
	/// Gets number of camps stacked
	/// </summary>
	[JsonPropertyName("camps_stacked")]
	public int? CampsStacked { get; init; }

    /// <summary>
    /// Gets a list of connection logs
    /// </summary>
    [JsonPropertyName("connection_log")]
    public List<ConnectionLog> ConnectionLog { get; init; } = [];

	/// <summary>
	/// Gets number of creeps stacked
	/// </summary>
	[JsonPropertyName("creeps_stacked")]
	public int? CreepsStacked { get; init; }

	/// <summary>
	/// Gets object containing information about damage dealt by the player to different units [unit,damage]
	/// </summary>
	[JsonPropertyName("damage")]
	public Dictionary<string, int> Damage { get; init; } = [];

	/// <summary>
	/// Gets object containing information about the sources of this player's damage to heroes
	/// </summary>
	[JsonPropertyName("damage_inflictor")]
	public Dictionary<string, int> DamageInflictor { get; init; } = [];

	/// <summary>
	/// Gets object containing information about the sources of damage received by this player from heroes
	/// </summary>
	// null in keys is automatic attacks on heroes
	[JsonPropertyName("damage_inflictor_received")]
	public Dictionary<string, int> DamageInflictorReceived { get; init; } = [];

	/// <summary>
	/// Gets object containing information about from whom the player took damage
	/// </summary>
	[JsonPropertyName("damage_taken")]
	public Dictionary<string, int> DamageTaken { get; init; } = [];

	/// <summary>
	/// Gets object containing information on how and how much damage the player dealt to other heroes
	/// </summary>
	[JsonPropertyName("damage_targets")]
	public Dictionary<string, Dictionary<string, int>> DamageTargets { get; init; } = [];

	/// <summary>
	/// Gets number of deaths
	/// </summary>
	[JsonPropertyName("deaths")]
	public int Deaths { get; init; }

	/// <summary>
	/// Gets number of denies
	/// </summary>
	[JsonPropertyName("denies")]
	public int Denies { get; init; }

	/// <summary>
	/// Gets a list containing number of denies at different times of the match
	/// </summary>
	[JsonPropertyName("dn_t")]
	public List<int> DeniesAtDifferentTimes { get; init; } = [];

	/// <summary>
	/// Gets amount of gold at the end of the game
	/// </summary>
	[JsonPropertyName("gold")]
	public int Gold { get; init; }

	/// <summary>
	/// Gets gold per minute obtained by this player
	/// </summary>
	[JsonPropertyName("gold_per_min")]
	public int GoldPerMin { get; init; }

	/// <summary>
	/// Gets object containing information on how the player gained gold over the course of the match
	/// </summary>
	[JsonPropertyName("gold_reasons")]
	public Dictionary<GoldReason, int> GoldReasons { get; init; } = new();

	/// <summary>
	/// Gets how much gold the player spent
	/// </summary>
	[JsonPropertyName("gold_spent")]
	public int GoldSpent { get; init; }

	/// <summary>
	/// Gets a list containing total gold at different times of the match
	/// </summary>
	[JsonPropertyName("gold_t")]
	public List<int> GoldEachMinute { get; init; } = [];

	/// <summary>
	/// Gets a hero damage dealt
	/// </summary>
	[JsonPropertyName("hero_damage")]
	public long HeroDamage { get; init; }

	/// <summary>
	/// Gets a hero healing done
	/// </summary>
	[JsonPropertyName("hero_healing")]
	public long HeroHealing { get; init; }

	/// <summary>
	/// Gets an object containing information on how many ticks of damages the hero inflicted with different spells and damage inflictors
	/// </summary>
	[JsonPropertyName("hero_hits")]
	public Dictionary<string, int> HeroHits { get; init; } = new();

	/// <summary>
	/// Gets the ID value of the hero played.
	/// </summary>
	[JsonPropertyName("hero_id")]
	public long HeroId { get; init; }

    /// <summary>
    /// Gets the chosen aspect
    /// </summary>
    [JsonPropertyName("hero_variant")]
    public int? HeroVariant { get; init; }

	/// <summary>
	/// Gets an item in the player's first slot
	/// </summary>
	[JsonPropertyName("item_0")]
	public long Item0 { get; init; }

	/// <summary>
	/// Gets an item in the player's second slot
	/// </summary>
	[JsonPropertyName("item_1")]
	public long Item1 { get; init; }

	/// <summary>
	/// Gets an item in the player's third slot
	/// </summary>
	[JsonPropertyName("item_2")]
	public long Item2 { get; init; }

	/// <summary>
	/// Gets an item in the player's fourth slot
	/// </summary>
	[JsonPropertyName("item_3")]
	public long Item3 { get; init; }

	/// <summary>
	/// Gets an item in the player's fifth slot
	/// </summary>
	[JsonPropertyName("item_4")]
	public long Item4 { get; init; }

	/// <summary>
	/// Gets an item in the player's sixth slot
	/// </summary>
	[JsonPropertyName("item_5")]
	public long Item5 { get; init; }

	/// <summary>
	/// Gets a dictionary containing information about how many times a player used items
	/// </summary>
	[JsonPropertyName("item_uses")]
	public Dictionary<string, int> ItemUses { get; init; } = new();

	/// <summary>
	/// Gets a dictionary containing information about the player's killstreaks
	/// </summary>
	[JsonPropertyName("kill_streaks")]
	public Dictionary<string, int> KillStreaks { get; init; } = new();

	/// <summary>
	/// Gets a dictionary containing information about what units the player killed
	/// </summary>
	[JsonPropertyName("killed")]
	public Dictionary<string, int> UnitsKilled { get; init; } = new();

	/// <summary>
	/// Gets a dictionary containing information about who killed the player
	/// </summary>
	[JsonPropertyName("killed_by")]
	public Dictionary<string, int> KilledBy { get; init; } = new();

	/// <summary>
	/// Gets a number of kills
	/// </summary>
	[JsonPropertyName("kills")]
	public long Kills { get; init; }

	/// <summary>
	/// Gets a list containing information on which hero the player killed at what time
	/// </summary>
	[JsonPropertyName("kills_log")]
	public List<KillLog> KillsLog { get; init; } = [];

	/// <summary>
	/// Gets a object containing information on lane position
	/// </summary>
	/// <note>First key is X. The lowest 64 (left-down corner) and the highest 192 (right-down corner)</note>
	/// <note>Second key is Y. The lowest 64 (down side) and the highest 192 (up side)</note>
	[JsonPropertyName("lane_pos")]
	public Dictionary<string, Dictionary<string, int>> LanePos { get; init; } = new();

	/// <summary>
	/// Gets a number of last hits
	/// </summary>
	[JsonPropertyName("last_hits")]
	public int LastHits { get; init; }

	/// <summary>
	/// Gets an integer describing whether or not the player left the game. 0: didn't leave. 1: left safely. 2+: Abandoned
	/// </summary>
	[JsonPropertyName("leaver_status")]
	public LeaverStatus? LeaverStatus { get; init; }

	/// <summary>
	/// Gets a level at the end of the game
	/// </summary>
	[JsonPropertyName("level")]
	public int Level { get; init; }

	/// <summary>
	/// Gets a list describing last hits at each minute in the game
	/// </summary>
	[JsonPropertyName("lh_t")]
	public List<int> LastHitsEachMinute { get; init; } = [];

	/// <summary>
	/// Gets a dictionary with information on the life state of the player
	/// </summary>
	[JsonPropertyName("life_state")]
	public Dictionary<LifeState, long> LifeState { get; init; } = new();

	/// <summary>
	/// Gets a dictionary with information on the highest damage instance the player inflicted
	/// </summary>
	[JsonPropertyName("max_hero_hit")]
	public MaxHeroHit MaxHeroHit { get; init; } = new();

	/// <summary>
	/// Gets a dictionary with information on the number of the number of multikills the player had
	/// </summary>
	[JsonPropertyName("multi_kills")]
	public Dictionary<string, int> MultiKills { get; init; } = new();

	/// <summary>
	/// Gets a dictionary with information on where the player placed observer wards. The location takes the form (outer number, inner number) and are from ~64-192.
	/// </summary>
	[JsonPropertyName("obs")]
	public Dictionary<string, Dictionary<string, double>> Obs { get; init; } = new();

	/// <summary>
	/// Gets a list containing information on when and where the player left observer wards
	/// </summary>
	[JsonPropertyName("obs_left_log")]
	public List<WardLog> ObsLeftLog { get; init; } = [];

	/// <summary>
	/// Gets a list containing information on when and where the player placed observer wards
	/// </summary>
	[JsonPropertyName("obs_log")]
	public List<WardLog> ObsLog { get; init; } = [];

	/// <summary>
	/// Gets a total number of observer wards placed
	/// </summary>
	[JsonPropertyName("obs_placed")]
	public int? ObsPlaced { get; init; }

	/// <summary>
	/// Gets a party ID
	/// </summary>
	[JsonPropertyName("party_id")]
	public int? PartyId { get; init; }

	/// <summary>
	/// Gets a size of the players party. If not in a party, will return 1.
	/// </summary>
	[JsonPropertyName("party_size")]
	public int PartySize { get; init; }

	/// <summary>
	/// Gets a list describing permanent buffs the player had at the end of the game. List of constants can be found here: https://github.com/odota/dotaconstants/blob/master/json/permanent_buffs.json
	/// </summary>
	[JsonPropertyName("permanent_buffs")]
	public List<PermanentBuff> PermanentBuffs { get; init; } = [];

    /// <summary>
    /// Gets a list of abilities for Other section in Perfomance tab
    /// </summary>
    [JsonPropertyName("performance_others")]
    public Dictionary<string, int> PerfomanceOthers { get; init; } = [];

	/// <summary>
	/// Gets a total number of pings
	/// </summary>
	[JsonPropertyName("pings")]
	public int? Pings { get; init; }

	/// <summary>
	/// Gets whether the player predicted victory
	/// </summary>
	[JsonPropertyName("pred_vict")]
	public BooleanState? PredVict { get; init; }

	/// <summary>
	/// Gets a dictionary containing information on the items the player purchased (item, times purchased)
	/// </summary>
	[JsonPropertyName("purchase")]
	public Dictionary<string, int> Purchase { get; init; } = new();

	/// <summary>
	/// Gets a list containing information on when items were purchased
	/// </summary>
	[JsonPropertyName("purchase_log")]
	public List<PurchaseLog> PurchaseLog { get; init; } = [];

	/// <summary>
	/// Gets whether the player randomed or not
	/// </summary>
	[JsonPropertyName("randomed")]
	public BooleanState? Randomed { get; init; }

	/// <summary>
	/// Gets whether the player repicked or not (no longer a thing?)
	/// </summary>
	[JsonPropertyName("repicked")]
	public BooleanState? Repicked { get; init; }

	/// <summary>
	/// Gets a total number of roshan kills (last hit on roshan) the player had
	/// </summary>
	[JsonPropertyName("roshans_killed")]
	public int? RoshansKilled { get; init; }

	/// <summary>
	/// Gets a number of runes picked up
	/// </summary>
	[JsonPropertyName("rune_pickups")]
	public int? RunePickups { get; init; }

	/// <summary>
	/// Gets a dictionary with information about which runes the player picked up
	/// </summary>
	[JsonPropertyName("runes")]
	public Dictionary<Runes, int> Runes { get; init; } = new();

	/// <summary>
	/// Gets a list with information on when runes were picked up
	/// </summary>
	[JsonPropertyName("runes_log")]
	public List<RuneLog> RuneLogs { get; init; } = [];

	/// <summary>
	/// Gets an object with information on where sentries were placed. The location takes the form (outer number, inner number) and are from ~64-192.
	/// </summary>
	[JsonPropertyName("sen")]
	public Dictionary<string, Dictionary<string, double>> Sen { get; init; } = new();

	/// <summary>
	/// Gets a list containing information on when and where the player placed sentries
	/// </summary>
	[JsonPropertyName("sen_left_log")]
	public List<WardLog> SenLeftLog { get; init; } = [];

	/// <summary>
	/// Gets a list with information on when and where sentries were placed by the player
	/// </summary>
	[JsonPropertyName("sen_log")]
	public List<WardLog> SenLog { get; init; } = [];

	/// <summary>
	/// Gets how many sentries were placed by the player
	/// </summary>
	[JsonPropertyName("sen_placed")]
	public int? SenPlaced { get; init; }

	/// <summary>
	/// Gets a total stun duration of all stuns by the player
	/// </summary>
	[JsonPropertyName("stuns")]
	public double? Stuns { get; init; }

	/// <summary>
	/// Gets a percentage of total teamfight participation by the player (value between 0-1)
	/// </summary>
	[JsonPropertyName("teamfight_participation")]
	public double? TeamfightParticipation { get; init; }

	/// <summary>
	/// Gets a list of time in seconds corresponding to the time of entries of other arrays in the match.
	/// </summary>
	[JsonPropertyName("times")]
	public List<int> Times { get; init; } = [];

	/// <summary>
	/// Gets a total tower damage done by the player
	/// </summary>
	[JsonPropertyName("tower_damage")]
	public int TowerDamage { get; init; }

	/// <summary>
	/// Gets a total number of tower kills (last hit on tower) the player had
	/// </summary>
	[JsonPropertyName("towers_killed")]
	public int? TowersKilled { get; init; }

	/// <summary>
	/// Gets an experience per minute obtained by the player
	/// </summary>
	[JsonPropertyName("xp_per_min")]
	public int XpPerMin { get; init; }

	/// <summary>
	/// Gets a dictionary containing information on the sources of this player's experience
	/// </summary>
	[JsonPropertyName("xp_reasons")]
	public Dictionary<XpReason, int> XpReasons { get; init; } = new();

	/// <summary>
	/// Gets a list of experience at each minute of the game
	/// </summary>
	[JsonPropertyName("xp_t")]
	public List<int> XpEachMinute { get; init; } = [];

	/// <summary>
	/// Gets a persona name of the player
	/// </summary>
	[JsonPropertyName("personaname")]
	public string? Personaname { get; init; }

	/// <summary>
	/// Gets a name of the player
	/// </summary>
	[JsonPropertyName("name")]
	public string? Name { get; init; }

	/// <summary>
	/// Gets a time in seconds of last login of the player
	/// </summary>
	[JsonPropertyName("last_login")]
	public DateTimeOffset? LastLogin { get; init; }

	/// <summary>
	/// Gets a boolean indicating whether Radiant won the match
	/// </summary>
	[JsonPropertyName("radiant_win")]
	public BooleanState RadiantWin { get; init; }

	/// <summary>
	/// Gets a start time of the match in seconds since 1970
	/// </summary>
	[JsonPropertyName("start_time")]
	public long StartTime { get; init; }

	/// <summary>
	/// Gets a duration of the game in seconds
	/// </summary>
	[JsonPropertyName("duration")]
	public int Duration { get; init; }

	/// <summary>
	/// Gets integer corresponding to lobby type of match.
	/// List of constants can be found here: https://github.com/odota/dotaconstants/blob/master/json/lobby_type.json.
	/// </summary>
	[JsonPropertyName("lobby_type")]
	public LobbyType LobbyType { get; init; }

	/// <summary>
	/// Gets an integer corresponding to game mode played.
	/// List of constants can be found here: https://github.com/odota/dotaconstants/blob/master/json/game_mode.json.
	/// </summary>
	[JsonPropertyName("game_mode")]
	public GameMode GameMode { get; init; }

	/// <summary>
	/// Gets integer representing the patch the game was played on
	/// </summary>
	[JsonPropertyName("patch")]
	public Patch Patch { get; init; }

	/// <summary>
	/// Gets boolean for whether or not the player is on Radiant
	/// </summary>
	[JsonPropertyName("isRadiant")]
	public BooleanState IsRadiant { get; init; }

	/// <summary>
	/// Gets binary integer representing whether or not the player won
	/// </summary>
	[JsonPropertyName("win")]
	public BooleanState Win { get; init; }

	/// <summary>
	/// Gets binary integer representing whether or not the player lost
	/// </summary>
	[JsonPropertyName("lose")]
	public BooleanState Lose { get; init; }

	/// <summary>
	/// Gets total gold at the end of the game
	/// </summary>
	[JsonPropertyName("total_gold")]
	public long TotalGold { get; init; }

	/// <summary>
	/// Gets total experience at the end of the game
	/// </summary>
	[JsonPropertyName("total_xp")]
	public long TotalXp { get; init; }

	/// <summary>
	/// Gets a number of kills per minute
	/// </summary>
	[JsonPropertyName("kills_per_min")]
	public double KillsPerMin { get; init; }

	/// <summary>
	/// Gets a kills deaths assists ratio (K+A)/D
	/// </summary>
	[JsonPropertyName("kda")]
	public double Kda { get; init; }

	/// <summary>
	/// Gets an abandons
	/// </summary>
	[JsonPropertyName("abandons")]
	public int Abandons { get; init; }

	/// <summary>
	/// Gets a total number of neutral creeps killed
	/// </summary>
	[JsonPropertyName("neutral_kills")]
	public int NeutralKills { get; init; }

	/// <summary>
	/// Gets a total number of tower kills the player had
	/// </summary>
	[JsonPropertyName("tower_kills")]
	public int TowerKills { get; init; }

	/// <summary>
	/// Gets a total number of courier kills the player had
	/// </summary>
	[JsonPropertyName("courier_kills")]
	public int CourierKills { get; init; }

	/// <summary>
	/// Gets a total number of lane creeps killed by the player
	/// </summary>
	[JsonPropertyName("lane_kills")]
	public int LaneKills { get; init; }

	/// <summary>
	/// Gets a total number of heroes killed by the player
	/// </summary>
	[JsonPropertyName("hero_kills")]
	public int HeroKills { get; init; }

	/// <summary>
	/// Gets a total number of observer wards killed by the player
	/// </summary>
	[JsonPropertyName("observer_kills")]
	public int ObserverKills { get; init; }

	/// <summary>
	/// Gets a total number of sentry wards killed by the player
	/// </summary>
	[JsonPropertyName("sentry_kills")]
	public int SentryKills { get; init; }

	/// <summary>
	/// Gets a total number of roshan kills (last hit on roshan) the player had
	/// </summary>
	[JsonPropertyName("roshan_kills")]
	public int RoshanKills { get; init; }

	/// <summary>
	/// Gets a total number of Necronomicon creeps killed by the player
	/// </summary>
	[JsonPropertyName("necronomicon_kills")]
	public int NecronomiconKills { get; init; }

	/// <summary>
	/// Gets a total number of Ancient creeps killed by the player
	/// </summary>
	[JsonPropertyName("ancient_kills")]
	public int AncientKills { get; init; }

	/// <summary>
	/// Gets a total number of buyback the player used
	/// </summary>
	[JsonPropertyName("buyback_count")]
	public int BuybackCount { get; init; }

	/// <summary>
	/// Gets a number of observer wards used
	/// </summary>
	[JsonPropertyName("observer_uses")]
	public int ObserverUses { get; init; }

	/// <summary>
	/// Gets a number of sentry wards used
	/// </summary>
	[JsonPropertyName("sentry_uses")]
	public int SentryUses { get; init; }

	/// <summary>
	/// Gets a lane efficiency of the player (value between 0-1)
	/// </summary>
	[JsonPropertyName("lane_efficiency")]
	public double LaneEfficiency { get; init; }

	/// <summary>
	/// Gets a percentage of lane efficiency (0-100)
	/// </summary>
	[JsonPropertyName("lane_efficiency_pct")]
	public int LaneEfficiencyPct { get; init; }

	/// <summary>
	/// Gets integer referring to which lane the hero laned in
	/// </summary>
	[JsonPropertyName("lane")]
	public LanePos? Lane { get; init; }

	/// <summary>
	/// Gets a lane role
	/// !!! This is better !!!
	/// </summary>
	[JsonPropertyName("lane_role")]
	public LaneRole LaneRole { get; init; }

	/// <summary>
	/// Gets a boolean referring to whether or not the player roamed
	/// </summary>
	[JsonPropertyName("is_roaming")]
	public BooleanState IsRoaming { get; init; }

	/// <summary>
	/// Gets object with information on when the player last purchased an item
	/// </summary>
	[JsonPropertyName("purchase_time")]
	public Dictionary<string, int> PurchaseTime { get; init; } = new();

	/// <summary>
	/// Gets object with information on when the player first puchased an item
	/// </summary>
	[JsonPropertyName("first_purchase_time")]
	public Dictionary<string, int> FirstPurchaseTime { get; init; } = new();

	/// <summary>
	/// Gets object with information on whether or not the item won
	/// </summary>
	[JsonPropertyName("item_win")]
	public Dictionary<string, int> ItemWin { get; init; } = new();

	/// <summary>
	/// Gets object containing binary integers that tell whether the item was purchased by the player (note: this is always 1)
	/// </summary>
	// This Dictionary contains in sorted order items that were purchased
	[JsonPropertyName("item_usage")]
	public Dictionary<string, int> ItemUsage { get; init; } = new();

	/// <summary>
	/// Gets a total number of TP scrolls purchased by the player
	/// </summary>
	[JsonPropertyName("purchase_tpscroll")]
	public int PurchaseTpscroll { get; init; }

	/// <summary>
	/// Gets amount of actions per minute
	/// </summary>
	[JsonPropertyName("actions_per_min")]
	public int ActionsPerMin { get; init; }

	/// <summary>
	/// Gets a life state of the player
	/// </summary>
	// How much time player was dead
	[JsonPropertyName("life_state_dead")]
	public int LifeStateDead { get; init; }

	/// <summary>
	/// Gets the rank tier of the player. Tens place indicates rank, ones place indicates stars.
	/// </summary>
	[JsonPropertyName("rank_tier")]
	public Rank? RankTier { get; init; }

	/// <summary>
	/// Gets a list of cosmetics
	/// </summary>
	[JsonPropertyName("cosmetics")]
	public List<Cosmetic> Cosmetics { get; init; } = [];

	/// <summary>
	/// Gets an object containing information on certain benchmarks like GPM, XPM, KDA, tower damage, etc
	/// </summary>
	[JsonPropertyName("benchmarks")]
	public MatchPlayerBenchmarks Benchmarks { get; init; } = new();

	/// <summary>
	/// Gets a total amount of observer wards purchased by the player
	/// </summary>
	[JsonPropertyName("purchase_ward_observer")]
	public long PurchaseWardObserver { get; init; }

	/// <summary>
	/// Gets a total amount of sentry wards purchased by the player
	/// </summary>
	[JsonPropertyName("purchase_ward_sentry")]
	public long PurchaseWardSentry { get; init; }

	/// <summary>
	/// Gets a total amount of gems purchased by the player
	/// </summary>
	[JsonPropertyName("purchase_gem")]
	public long PurchaseGem { get; init; }

    /// <summary>
    /// Gets the total amount of gold player earnt from game
    /// </summary>
    [JsonPropertyName("net_worth")]
    public int NetWorth { get; init; }

    /// <summary>
    /// 1 - true, 0 - false
    /// </summary>
    [JsonPropertyName("aghanims_scepter")]
    public BooleanState AghanimsScepter { get; init; }

    /// <summary>
    /// 1 - true, 0 - false
    /// </summary>
    [JsonPropertyName("aghanims_shard")]
    public BooleanState AghanimsShard { get; init; }
}
