using System.Text.Json.Serialization;
using GoS.Domain.Common.Enums;

namespace GoS.Domain.Common.Models;

public class League
{
	/// <summary>
	/// Gets the League ID.
	/// </summary>
	[JsonPropertyName("leagueid")]
	public long LeagueId { get; init; }

	/// <summary>
	/// Gets the tier for the tournament.
	/// </summary>
	[JsonPropertyName("tier")]
	public Tier? Tier { get; init; }

	/// <summary>
	/// Gets the name for the tournament.
	/// </summary>
	[JsonPropertyName("name")]
	public string Name { get; init; } = string.Empty;
}
