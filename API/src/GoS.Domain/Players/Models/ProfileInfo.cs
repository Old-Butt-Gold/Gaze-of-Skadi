using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;

namespace GoS.Domain.Players.Models;

/// <summary>
/// Represents a player profile.
/// </summary>
public class ProfileInfo
{
	/// <summary>
	/// Gets account ID of the player.
	/// </summary>
	[JsonPropertyName("account_id")]
	public long AccountId { get; init; }

	/// <summary>
	/// Gets the player's persona name.
	/// </summary>
	[JsonPropertyName("personaname")]
	public string PersonaName { get; init; } = string.Empty;

	/// <summary>
	/// Gets the player's real name.
	/// </summary>
	[JsonPropertyName("name")]
	public string Name { get; init; } = string.Empty;

	/// <summary>
	/// Gets whether the player has a plus account.
	/// </summary>
	[JsonPropertyName("plus")]
	public BooleanState? Plus { get; init; }

	/// <summary>
	/// Gets the player's Steam ID.
	/// </summary>
	[JsonPropertyName("steamid")]
	public string SteamId { get; init; } = string.Empty;

	/// <summary>
	/// Gets the player's avatar.
	/// </summary>
	[JsonPropertyName("avatar")]
	public Uri? Avatar { get; init; }

	/// <summary>
	/// Gets the player's medium avatar.
	/// </summary>
	[JsonPropertyName("avatarmedium")]
	public Uri? AvatarMedium { get; init; }

	/// <summary>
	/// Gets the player's full avatar.
	/// </summary>
	[JsonPropertyName("avatarfull")]
	public Uri? AvatarFull { get; init; }

	/// <summary>
	/// Is profile is closed or not
	/// </summary>
	[JsonPropertyName("fh_unavailable")]
	public BooleanState? FhUnavailable { get; init; }

	/// <summary>
	/// Gets the player's profile URL.
	/// </summary>
	[JsonPropertyName("profileurl")]
	public Uri? ProfileUrl { get; init; }

	/// <summary>
	/// Gets the player's last login.
	/// </summary>
	[JsonPropertyName("last_login")]
	public DateTimeOffset? LastLogin { get; init; }

	/// <summary>
	/// Gets the player's location country code.
	/// </summary>
	[JsonPropertyName("loccountrycode")]
	public string? LocCountryCode { get; init; }
}
