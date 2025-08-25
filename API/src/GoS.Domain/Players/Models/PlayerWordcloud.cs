using System.Text.Json.Serialization;

namespace GoS.Domain.Players.Models;

/// <summary>
/// Represents player wordcloud.
/// </summary>
public class PlayerWordCloud
{
	/// <summary>
	/// Gets player's word counts.
	/// </summary>
	[JsonPropertyName("my_word_counts")]
	public Dictionary<string, long> WriteWordCount { get; init; } = new();

	/// <summary>
	/// Gets word counts.
	/// </summary>
	[JsonPropertyName("all_word_counts")]
	public Dictionary<string, long> ReadWordCounts { get; init; } = new();
}
