using System.Text.Json.Serialization;
using OpenDota.Enums.Permanent;

namespace OpenDota.Routes.Common.Models;

/// <summary>
/// Represents a league.
/// </summary>
public class League
{
	/// <summary>
	/// Gets the League ID.
	/// </summary>
	[JsonPropertyName("leagueid")]
	public long LeagueId { get; init; }

	/// <summary>
	/// Gets the ticket for the tournament.
	/// </summary>
	[JsonPropertyName("ticket")]
	public string Ticket { get; init; } = string.Empty;

	/// <summary>
	/// Gets the banner for the tournament.
	/// </summary>
	[JsonPropertyName("banner")]
	public string Banner { get; init; } = string.Empty;

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
