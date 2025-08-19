using System.Text.Json.Serialization;

namespace OpenDota.Routes.Heroes.Models;

/// <summary>
/// Represents a benchmark result.
/// </summary>
public class BenchmarkResult
{
	/// <summary>
	/// Gets the gold per minute.
	/// </summary>
	[JsonPropertyName("gold_per_min")]
	public List<BenchmarkValue> GoldPerMinutes { get; init; } = [];

	/// <summary>
	/// Gets the experience per minute.
	/// </summary>
	[JsonPropertyName("xp_per_min")]
	public List<BenchmarkValue> XpPerMinutes { get; init; } = [];

	/// <summary>
	/// Gets the kills per minute.
	/// </summary>
	[JsonPropertyName("kills_per_min")]
	public List<BenchmarkValue> KillsPerMinutes { get; init; } = [];

	/// <summary>
	/// Gets the last hits per minute.
	/// </summary>
	[JsonPropertyName("last_hits_per_min")]
	public List<BenchmarkValue> LastHitPerMinutes { get; init; } = [];

	/// <summary>
	/// Gets the hero damage per minute.
	/// </summary>
	[JsonPropertyName("hero_damage_per_min")]
	public List<BenchmarkValue> HeroDamagePerMinutes { get; init; } = [];

	/// <summary>
	/// Gets the hero healing per minute.
	/// </summary>
	[JsonPropertyName("hero_healing_per_min")]
	public List<BenchmarkValue> HeroHealingPerMinutes { get; init; } = [];

	/// <summary>
	/// Gets the tower damage.
	/// </summary>
	[JsonPropertyName("tower_damage")]
	public List<BenchmarkValue> TowerDamage { get; init; } = [];
}
