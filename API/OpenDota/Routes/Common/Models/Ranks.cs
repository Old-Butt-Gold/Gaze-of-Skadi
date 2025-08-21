using System.Text.Json.Serialization;

namespace OpenDota.Routes.Common.Models;

/// <summary>
/// Represents ranks.
/// </summary>
public class Ranks
{
	/// <summary>
	/// Gets the rows.
	/// </summary>
	[JsonPropertyName("rows")]
	public List<Row> Rows { get; init; } = [];

	/// <summary>
	/// Gets the sum.
	/// </summary>
	[JsonPropertyName("sum")]
	public Sum Sum { get; init; } = new();
}
