using System.Text.Json.Serialization;

namespace GoS.Domain.Matches.Models;

/// <summary>
/// Represents a max hero hit.
/// </summary>
public class MaxHeroHit
{
	/// <summary>
	/// Gets a time (in seconds) when the hit occurred
	/// </summary>
	[JsonPropertyName("time")]
	public int Time { get; init; }

	/// <summary>
	/// Gets the inflictor of the hit
	/// </summary>
	[JsonPropertyName("inflictor")]
	public string? Inflictor { get; init; }

	/// <summary>
	/// Gets the unit to which it was inflicted
	/// </summary>
	[JsonPropertyName("key")]
	public string Key { get; init; } = string.Empty;

	/// <summary>
	/// Gets a damage inflicted
	/// </summary>
	[JsonPropertyName("value")]
	public long Value { get; init; }
}
