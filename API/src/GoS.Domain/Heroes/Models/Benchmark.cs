using System.Text.Json.Serialization;

namespace GoS.Domain.Heroes.Models;

/// <summary>
/// Represents a benchmark.
/// </summary>
public class Benchmark
{
	/// <summary>
	/// Gets the ID value of the hero played.
	/// </summary>
	[JsonPropertyName("hero_id")]
	public long HeroId { get; init; }

	/// <summary>
	/// Gets the result.
	/// </summary>
	[JsonPropertyName("result")]
	public BenchmarkResult Result { get; init; } = new();
}

/// <summary>
/// Represents a benchmark result.
/// </summary>
public class BenchmarkResult
{
    /// <summary>
    /// Gets the gold per minute.
    /// </summary>
    [JsonPropertyName("gold_per_min")]
    public IEnumerable<BenchmarkValue> GoldPerMinutes { get; init; } = [];

    /// <summary>
    /// Gets the experience per minute.
    /// </summary>
    [JsonPropertyName("xp_per_min")]
    public IEnumerable<BenchmarkValue> XpPerMinutes { get; init; } = [];

    /// <summary>
    /// Gets the kills per minute.
    /// </summary>
    [JsonPropertyName("kills_per_min")]
    public IEnumerable<BenchmarkValue> KillsPerMinutes { get; init; } = [];

    /// <summary>
    /// Gets the last hits per minute.
    /// </summary>
    [JsonPropertyName("last_hits_per_min")]
    public IEnumerable<BenchmarkValue> LastHitPerMinutes { get; init; } = [];

    /// <summary>
    /// Gets the hero damage per minute.
    /// </summary>
    [JsonPropertyName("hero_damage_per_min")]
    public IEnumerable<BenchmarkValue> HeroDamagePerMinutes { get; init; } = [];

    /// <summary>
    /// Gets the hero healing per minute.
    /// </summary>
    [JsonPropertyName("hero_healing_per_min")]
    public IEnumerable<BenchmarkValue> HeroHealingPerMinutes { get; init; } = [];

    /// <summary>
    /// Gets the tower damage.
    /// </summary>
    [JsonPropertyName("tower_damage")]
    public IEnumerable<BenchmarkValue> TowerDamage { get; init; } = [];
}

/// <summary>
/// Represents a benchmark value.
/// </summary>
public class BenchmarkValue
{
    /// <summary>
    /// Gets the percentile.
    /// </summary>
    [JsonPropertyName("percentile")]
    public double Percentile { get; init; }

    /// <summary>
    /// Gets the value.
    /// </summary>
    [JsonPropertyName("value")]
    public double Value { get; init; }
}
