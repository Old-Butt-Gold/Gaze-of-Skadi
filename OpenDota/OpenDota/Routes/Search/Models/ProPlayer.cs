using System.Text.Json.Serialization;

namespace OpenDota.Routes.Search.Models;

public class ProPlayer
{
	/// <summary>
	/// Gets player's account identifier.
	/// </summary>
	[JsonPropertyName("account_id")]
	public long AccountId { get; init; }

	/// <summary>
	/// Gets player's steam identifier.
	/// </summary>
	[JsonPropertyName("steamid")]
	public string SteamId { get; init; } = string.Empty;

	/// <summary>
	/// Gets steam picture URL (small picture).
	/// </summary>
	[JsonPropertyName("avatar")]
	public Uri? Avatar { get; init; }

	/// <summary>
	/// Gets steam picture URL (medium picture).
	/// </summary>
	[JsonPropertyName("avatarmedium")]
	public Uri? AvatarMedium { get; init; }

	/// <summary>
	/// Gets steam picture URL (full picture).
	/// </summary>
	[JsonPropertyName("avatarfull")]
	public Uri? AvatarFull { get; init; }

	/// <summary>
	/// Gets steam profile URL.
	/// </summary>
	[JsonPropertyName("profileurl")]
	public Uri? ProfileUrl { get; init; }

	/// <summary>
	/// Gets player's Steam name.
	/// </summary>
	[JsonPropertyName("personaname")]
	public string PersonaName { get; init; } = string.Empty;

	/// <summary>
	/// Gets date and time of last login to OpenDot.
	/// </summary>
	[JsonPropertyName("last_login")]
	public DateTimeOffset? LastLogin { get; init; }

	/// <summary>
	/// Gets date and time of last request to refresh player's match history.
	/// </summary>
	[JsonPropertyName("full_history_time")]
	public DateTimeOffset? FullHistoryTime { get; init; }

	/// <summary>
	/// Gets amount of dollars the player has donated to OpenDot.
	/// </summary>
	[JsonPropertyName("cheese")]
	public int? Cheese { get; init; }

	/// <summary>
	/// Gets whether the refresh of player' match history failed.
	/// </summary>
	[JsonPropertyName("fh_unavailable")]
	public bool? FhUnavailable { get; init; }

	/// <summary>
	/// Gets player's country identifier, e.g. US.
	/// </summary>
	[JsonPropertyName("loccountrycode")]
	public string LocCountryCode { get; init; } = string.Empty;

	/// <summary>
	/// Gets last match time.
	/// </summary>
	[JsonPropertyName("last_match_time")]
	public DateTimeOffset? LastMatchTime { get; init; }

	/// <summary>
	/// Gets plus.
	/// </summary>
	[JsonPropertyName("plus")]
	public bool? Plus { get; init; }

	/// <summary>
	/// Gets verified player name, e.g. 'Miracle-'.
	/// </summary>
	[JsonPropertyName("name")]
	public string Name { get; init; } = string.Empty;

	/// <summary>
	/// Gets player's country code.
	/// </summary>
	[JsonPropertyName("country_code")]
	public string CountryCode { get; init; } = string.Empty;

	/// <summary>
	/// Gets player's ingame role (core: 1 or support: 2).
	/// </summary>
	[JsonPropertyName("fantasy_role")]
	public int? FantasyRole { get; init; }

	/// <summary>
	/// Gets player's team identifier.
	/// </summary>
	[JsonPropertyName("team_id")]
	public long? TeamId { get; init; }

	/// <summary>
	/// Gets player's team name, e.g. 'Evil Geniuses'.
	/// </summary>
	[JsonPropertyName("team_name")]
	public string TeamName { get; init; } = string.Empty;

	/// <summary>
	/// Gets player's team shorthand tag, e.g. 'EG'.
	/// </summary>
	[JsonPropertyName("team_tag")]
	public string TeamTag { get; init; } = string.Empty;

	/// <summary>
	/// Gets a value indicating whether the roster lock is active.
	/// </summary>
	[JsonPropertyName("is_locked")]
	public bool? IsLocked { get; init; }

	/// <summary>
	/// Gets a value indicating whether the player is professional or not.
	/// </summary>
	[JsonPropertyName("is_pro")]
	public bool? IsPro { get; init; }

	/// <summary>
	/// When the roster lock will end
	/// </summary>
	[JsonPropertyName("locked_until")]
	public object? LockedUntil { get; init; }
}
