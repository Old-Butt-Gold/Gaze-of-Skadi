using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;

namespace GoS.Domain.Common.Models;

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

/// <summary>
/// Represents ranks.
/// </summary>
public class Ranks
{
    /// <summary>
    /// Gets the rows.
    /// </summary>
    [JsonPropertyName("rows")]
    public IEnumerable<Row> Rows { get; init; } = [];

    /// <summary>
    /// Gets the sum.
    /// </summary>
    [JsonPropertyName("sum")]
    public Sum Sum { get; init; } = new();
}

/// <summary>
/// Represents a row.
/// </summary>
public class Row
{
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

/// <summary>
/// Represents a sum.
/// </summary>
public class Sum
{
    /// <summary>
    /// Gets the count.
    /// </summary>
    [JsonPropertyName("count")]
    public long Count { get; init; }
}
