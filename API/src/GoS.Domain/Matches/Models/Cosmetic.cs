using System.Text.Json.Serialization;

namespace GoS.Domain.Matches.Models;

/// <summary>
/// Represents a cosmetic
/// </summary>
public class Cosmetic
{
	/// <summary>
	/// Gets the creation date
	/// </summary>
	[JsonPropertyName("creation_date")]
	public DateTimeOffset? CreationDate { get; init; }

	/// <summary>
	/// Gets the image path
	/// </summary>
	[JsonPropertyName("image_path")]
	public string ImagePath { get; init; } = string.Empty;

	/// <summary>
	/// Gets the item ID
	/// </summary>
	[JsonPropertyName("item_id")]
	public int ItemId { get; init; }

	/// <summary>
	/// Gets the item rarity
	/// </summary>
	[JsonPropertyName("item_rarity")]
	public string ItemRarity { get; init; } = string.Empty;

	/// <summary>
	/// Gets the name
	/// </summary>
	[JsonPropertyName("name")]
	public string Name { get; init; } = string.Empty;
}
