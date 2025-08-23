using System.Text.Json.Serialization;

namespace GoS.Domain.Players.Models;

/// <summary>
/// Represents player ward map.
/// </summary>
public class PlayerWardMap
{
	/// <summary>
	/// Get observer wards.
	/// </summary>
	[JsonPropertyName("obs")]
	public Dictionary<string, Dictionary<string, long>> Obs { get; init; } = new();

	/// <summary>
	/// Gets sentry wards.
	/// </summary>
	[JsonPropertyName("sen")]
	public Dictionary<string, Dictionary<string, long>> Sen { get; init; } = new();
}
