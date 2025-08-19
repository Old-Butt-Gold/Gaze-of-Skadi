using System.Text.Json.Serialization;

namespace OpenDota.Routes.Teams.Models;

/// <summary>
/// Represents a team.
/// </summary>
public class Team
{
	/// <summary>
	/// Gets the team id.
	/// </summary>
	[JsonPropertyName("team_id")]
	public int TeamId { get; init; }

	/// <summary>
	/// Gets the rating.
	/// </summary>
	[JsonPropertyName("rating")]
	public double Rating { get; init; }

	/// <summary>
	/// Gets the wins.
	/// </summary>
	[JsonPropertyName("wins")]
	public int Wins { get; init; }

	/// <summary>
	/// Gets the losses.
	/// </summary>
	[JsonPropertyName("losses")]
	public int Losses { get; init; }

	/// <summary>
	/// Gets the last match time.
	/// </summary>
	[JsonPropertyName("last_match_time")]
	public long LastMatchTime { get; init; }

	/// <summary>
	/// Gets the name.
	/// </summary>
	[JsonPropertyName("name")]
	public string Name { get; init; } = string.Empty;

	/// <summary>
	/// Gets the tag.
	/// </summary>
	[JsonPropertyName("tag")]
	public string Tag { get; init; } = string.Empty;

	/// <summary>
	/// Gets the logo url.
	/// </summary>
	[JsonPropertyName("logo_url")]
	public Uri? LogoUrl { get; init; }
}
