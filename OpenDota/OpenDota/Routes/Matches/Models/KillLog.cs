using System.Text.Json.Serialization;

namespace OpenDota.Routes.Matches.Models;

/// <summary>
/// Represents a kill log.
/// </summary>
public class KillLog
{
	/// <summary>
	/// Gets the unit who got killed
	/// </summary>
	[JsonPropertyName("key")]
	public string Key { get; init; } = string.Empty;

	/// <summary>
	/// Gets the time in seconds when the kill happened.
	/// </summary>
	[JsonPropertyName("time")]
	public long Time { get; init; }
}
