using System.Text.Json.Serialization;

namespace GoS.Domain.Players.Enums;

public enum PlayerField
{
	/// <summary>
	/// Kills.
	/// </summary>
	[JsonPropertyName("kills")]
	Kills = 0,

	/// <summary>
	/// Deaths.
	/// </summary>
	[JsonPropertyName("deaths")]
	Deaths = 1,

	/// <summary>
	/// Assists.
	/// </summary>
	[JsonPropertyName("assists")]
	Assists = 2,

	/// <summary>
	/// KDA
	/// </summary>
	[JsonPropertyName("kda")]
	Kda = 3,

	/// <summary>
	/// Gold per minute.
	/// </summary>
	[JsonPropertyName("gold_per_min")]
	GoldPerMin = 4,

	/// <summary>
	/// Xp per minute.
	/// </summary>
	[JsonPropertyName("xp_per_min")]
	XpPerMin = 5,

	/// <summary>
	/// Last hits.
	/// </summary>
	[JsonPropertyName("last_hits")]
	LastHits = 6,

	/// <summary>
	/// Denies.
	/// </summary>
	[JsonPropertyName("denies")]
	Denies = 7,

	/// <summary>
	/// Lane efficiency at first ten minutes
	/// </summary>
	[JsonPropertyName("lane_efficiency_pct")]
	LaneEfficiencyPct = 8,

	/// <summary>
	/// Duration.
	/// </summary>
	[JsonPropertyName("duration")]
	Duration = 9,

	/// <summary>
	/// Level
	/// </summary>
	[JsonPropertyName("level")]
	Level = 10,

	/// <summary>
	/// Hero damage.
	/// </summary>
	[JsonPropertyName("hero_damage")]
	HeroDamage = 11,

	/// <summary>
	/// Tower damage.
	/// </summary>
	[JsonPropertyName("tower_damage")]
	TowerDamage = 12,

	/// <summary>
	/// Hero healing.
	/// </summary>
	[JsonPropertyName("hero_healing")]
	HeroHealing = 13,

	/// <summary>
	/// Seconds of disable on heroes
	/// </summary>
	[JsonPropertyName("stuns")]
	Stuns = 14,

	/// <summary>
	/// Tower Kills
	/// </summary>
	[JsonPropertyName("tower_kills")]
	TowerKills = 15,

	/// <summary>
	/// Neutral Kills
	/// </summary>
	[JsonPropertyName("neutral_kills")]
	NeutralKills = 16,

	/// <summary>
	/// Courier kills
	/// </summary>
	[JsonPropertyName("courier_kills")]
	CourierKills = 17,

	/// <summary>
	/// Tpscroll purchase
	/// </summary>
	[JsonPropertyName("purchase_tpscroll")]
	PurchaseTpScroll = 18,

	/// <summary>
	/// Purchased observer wards
	/// </summary>
	[JsonPropertyName("purchase_ward_observer")]
	PurchaseWardObserver = 19,

	/// <summary>
	/// Purchased sentry wards
	/// </summary>
	[JsonPropertyName("purchase_ward_sentry")]
	PurchaseWardSentry = 20,

	/// <summary>
	/// Gem purchase
	/// </summary>
	[JsonPropertyName("purchase_gem")]
	PurchaseGem = 21,

	/// <summary>
	/// Rapier purchase
	/// </summary>
	[JsonPropertyName("purchase_rapier")]
	PurchaseRapier = 22,

	/// <summary>
	/// Pings
	/// </summary>
	[JsonPropertyName("pings")]
	Pings = 23,

	/// <summary>
	/// Maximum gold advantage in a lost game
	/// </summary>
	[JsonPropertyName("throw")]
	Throw = 24,

	/// <summary>
	/// Comeback
	/// </summary>
	[JsonPropertyName("comeback")]
	Comeback = 25,

	/// <summary>
	/// Maximum gold advantage in a won game
	/// </summary>
	[JsonPropertyName("stomp")]
	Stomp = 26,

	/// <summary>
	/// Loss
	/// </summary>
	[JsonPropertyName("loss")]
	Loss = 27,

	/// <summary>
	/// Actions in minute
	/// </summary>
	[JsonPropertyName("actions_per_min")]
	ActionsPerMin = 28
}
