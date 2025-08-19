using System.Text.Json.Serialization;

namespace OpenDota.Routes.Matches.Models;

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
	/// Gets the image inventory
	/// </summary>
	[JsonPropertyName("image_inventory")]
	public string ImageInventory { get; init; } = string.Empty;

	/// <summary>
	/// Gets the image path
	/// </summary>
	[JsonPropertyName("image_path")]
	public string ImagePath { get; init; } = string.Empty;

	/// <summary>
	/// Gets the item description
	/// </summary>
	[JsonPropertyName("item_description")]
	public string ItemDescription { get; init; } = string.Empty;

	/// <summary>
	/// Gets the item ID
	/// </summary>
	[JsonPropertyName("item_id")]
	public int ItemId { get; init; }

	/// <summary>
	/// Gets the item name
	/// </summary>
	[JsonPropertyName("item_name")]
	public string ItemName { get; init; } = string.Empty;

	/// <summary>
	/// Gets the item rarity
	/// </summary>
	[JsonPropertyName("item_rarity")]
	public string ItemRarity { get; init; } = string.Empty;

	/// <summary>
	/// Gets the item type name
	/// </summary>
	[JsonPropertyName("item_type_name")]
	public string ItemTypeName { get; init; } = string.Empty;

	/// <summary>
	/// Gets the name
	/// </summary>
	[JsonPropertyName("name")]
	public string Name { get; init; } = string.Empty;

	/// <summary>
	/// Gets the prefab
	/// </summary>
	[JsonPropertyName("prefab")]
	public string Prefab { get; init; } = string.Empty;

	/// <summary>
	/// Gets the used by heroes
	/// </summary>
	[JsonPropertyName("used_by_heroes")]
	public string UsedByHeroes { get; init; } = string.Empty;
}
