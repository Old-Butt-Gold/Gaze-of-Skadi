using System.Text.Json.Serialization;
using GoS.Domain.Players.Enums;

namespace GoS.Domain.Players.Models;

/// <summary>
/// Represents player total.
/// </summary>
public class PlayerTotal
{
	/// <summary>
	/// Gets or sets the field.
	/// </summary>
	[JsonPropertyName("field")]
	public PlayerTotalField Field { get; init; }

	/// <summary>
	/// Gets or sets the sum.
	/// </summary>
	[JsonPropertyName("sum")]
	public double Sum { get; init; }
}
