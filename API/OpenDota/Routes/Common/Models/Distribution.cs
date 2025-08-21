using System.Text.Json.Serialization;

namespace OpenDota.Routes.Common.Models;

/// <summary>
/// Represents a distribution.
/// </summary>
public class Distribution
{
	/// <summary>
	/// Gets the ranks.
	/// </summary>
	[JsonPropertyName("ranks")]
	public Ranks Ranks { get; init; } = new();
}
