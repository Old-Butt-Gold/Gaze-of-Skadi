using System.Text.Json.Serialization;

namespace OpenDota.Routes.Search.Models;

/// <summary>
/// Represents a response by PersonaName.
/// </summary>
public class PlayerResponse
{
	/// <summary>
	/// Gets account ID of the player.
	/// </summary>
	[JsonPropertyName("account_id")]
	public long AccountId { get; init; }

	/// <summary>
	/// Gets persona name of the player.
	/// </summary>
	[JsonPropertyName("personaname")]
	public string PersonaName { get; init; } = string.Empty;

	/// <summary>
	/// Gets avatar full URL of the player.
	/// </summary>
	[JsonPropertyName("avatarfull")]
	public Uri? AvatarFull { get; init; }

	/// <summary>
	/// Gets last_match_time. May not be present or null.
	/// </summary>
	[JsonPropertyName("last_match_time")]
	public DateTimeOffset? LastMatchTime { get; init; }

	/// <summary>
	/// Gets similarity of the player.
	/// </summary>
	[JsonPropertyName("similarity")]
	public double Similarity { get; init; }
}
