using System.Text.Json.Serialization;

namespace OpenDota.Routes.Players.Models;

/// <summary>
/// Represents player wordcloud.
/// </summary>
public class PlayerWordCloud
{
	/// <summary>
	/// Gets player's word counts.
	/// </summary>
	[JsonPropertyName("my_word_counts")]
	public Dictionary<string, long> MyWordCounts { get; init; } = new();

	/// <summary>
	/// Gets word counts.
	/// </summary>
	[JsonPropertyName("all_word_counts")]
	public Dictionary<string, long> AllWordCounts { get; init; } = new();
}
