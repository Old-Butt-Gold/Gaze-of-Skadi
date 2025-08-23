using System.Text.Json.Serialization;

namespace GoS.Domain.Matches.Models;

/// <summary>
/// Represents a match team.
/// </summary>
public class MatchTeam
{
	/// <summary>
	/// Gets ID of team
	/// </summary>
	[JsonPropertyName("team_id")]
	public int TeamId { get; init; }

	/// <summary>
	/// Gets name of the team
	/// </summary>
	[JsonPropertyName("name")]
	public string Name { get; init; } = string.Empty;

	/// <summary>
	/// Gets tag of the team
	/// </summary>
	[JsonPropertyName("tag")]
	public string Tag { get; init; } = string.Empty;

	/// <summary>
	/// Gets url of the team logo
	/// </summary>
	[JsonPropertyName("logo_url")]
	public Uri? LogoUrl { get; init; }
}
