using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;

namespace GoS.Domain.Common.Models;

/// <summary>
/// Represents a row.
/// </summary>
public class Row
{
	/// <summary>
	/// Gets the bin.
	/// </summary>
	[JsonPropertyName("bin")]
	public int Bin { get; init; }

	/// <summary>
	/// Gets the bin name.
	/// </summary>
	[JsonPropertyName("bin_name")]
	public Rank BinName { get; init; }

	/// <summary>
	/// Gets the count.
	/// </summary>
	[JsonPropertyName("count")]
	public int Count { get; init; }

	/// <summary>
	/// Gets the cumulative sum.
	/// </summary>
	[JsonPropertyName("cumulative_sum")]
	public int CumulativeSum { get; init; }
}
