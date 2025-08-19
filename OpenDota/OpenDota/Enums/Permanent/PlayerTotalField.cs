using System.Text.Json.Serialization;

namespace OpenDota.Enums.Permanent;

/// <summary>
/// Enum of player total fields.
/// </summary>
public enum PlayerTotalField
{
    [JsonPropertyName("kills")] Kills,
    [JsonPropertyName("deaths")] Deaths,
    [JsonPropertyName("assists")] Assists,
    [JsonPropertyName("kda")] Kda,
    [JsonPropertyName("gold_per_min")] GoldPerMin,
    [JsonPropertyName("xp_per_min")] XpPerMin,
    [JsonPropertyName("last_hits")] LastHits,
    [JsonPropertyName("denies")] Denies,
    [JsonPropertyName("lane_efficiency_pct")] LaneEfficiencyPct,
    [JsonPropertyName("duration")] Duration,
    [JsonPropertyName("level")] Level,
    [JsonPropertyName("hero_damage")] HeroDamage,
    [JsonPropertyName("tower_damage")] TowerDamage,
    [JsonPropertyName("hero_healing")] HeroHealing,
    [JsonPropertyName("stuns")] Stuns,
    [JsonPropertyName("tower_kills")] TowerKills,
    [JsonPropertyName("neutral_kills")] NeutralKills,
    [JsonPropertyName("courier_kills")] CourierKills,
    [JsonPropertyName("purchase_tpscroll")] PurchaseTpScroll,
    [JsonPropertyName("purchase_ward_observer")] PurchaseWardObserver,
    [JsonPropertyName("purchase_ward_sentry")] PurchaseWardSentry,
    [JsonPropertyName("purchase_gem")] PurchaseGem,
    [JsonPropertyName("purchase_rapier")] PurchaseRapier,
    [JsonPropertyName("pings")] Pings,
    [JsonPropertyName("throw")] Throw,
    [JsonPropertyName("comeback")] Comeback,
    [JsonPropertyName("stomp")] Stomp,
    [JsonPropertyName("loss")] Loss,
    [JsonPropertyName("actions_per_min")] ActionsPerMin
}
