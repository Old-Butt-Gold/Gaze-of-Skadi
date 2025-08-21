using System.Text.Json.Serialization;

namespace OpenDota.Routes.Matches.Models;

/// <summary>
/// Represents an additional unit
/// </summary>
public class AdditionalUnit
{
	/// <summary>
	/// Gets name of unit
	/// </summary>
	[JsonPropertyName("unitname")]
	public string UnitName { get; init; } = string.Empty;

	/// <summary>
	/// Gets ID of item 0
	/// </summary>
	[JsonPropertyName("item_0")]
	public int Item0 { get; init; }

	/// <summary>
	/// Gets ID of item 1
	/// </summary>
	[JsonPropertyName("item_1")]
	public int Item1 { get; init; }

	/// <summary>
	/// Gets ID of item 2
	/// </summary>
	[JsonPropertyName("item_2")]
	public int Item2 { get; init; }

	/// <summary>
	/// Gets ID of item 3
	/// </summary>
	[JsonPropertyName("item_3")]
	public int Item3 { get; init; }

	/// <summary>
	/// Gets ID of item 4
	/// </summary>
	[JsonPropertyName("item_4")]
	public int Item4 { get; init; }

	/// <summary>
	/// Gets ID of item 5
	/// </summary>
	[JsonPropertyName("item_5")]
	public int Item5 { get; init; }

	/// <summary>
	/// Gets ID of backpack item 0
	/// </summary>
	[JsonPropertyName("backpack_0")]
	public int Backpack0 { get; init; }

	/// <summary>
	/// Gets ID of backpack item 1
	/// </summary>
	[JsonPropertyName("backpack_1")]
	public int Backpack1 { get; init; }

	/// <summary>
	/// Gets ID of backpack item 2
	/// </summary>
	[JsonPropertyName("backpack_2")]
	public int Backpack2 { get; init; }
	
	[JsonPropertyName("item_neutral")]
	public int ItemNeutral { get; init; }
}
