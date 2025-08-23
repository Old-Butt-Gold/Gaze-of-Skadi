using System.Text.Json.Serialization;

namespace GoS.Domain.Matches.Models;

/// <summary>
/// Represents a purchase log
/// </summary>
public class PurchaseLog
{
	/// <summary>
	/// Gets a key of the item purchased
	/// </summary>
	[JsonPropertyName("key")]
	public string Key { get; init; } = string.Empty;

	/// <summary>
	/// Gets a time in seconds when the item was purchased
	/// </summary>
	[JsonPropertyName("time")]
	public long Time { get; init; }
}
