using System.Text.Json.Serialization;

namespace OpenDota.Routes.Heroes.Models;

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
