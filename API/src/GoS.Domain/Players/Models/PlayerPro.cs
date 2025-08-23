using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;

namespace GoS.Domain.Players.Models;

/// <summary>
/// Represents a pro player.
/// </summary>
public class PlayerPro
{
	/// <summary>
	/// Gets account ID of the player.
	/// </summary>
	[JsonPropertyName("account_id")]
	public long AccountId { get; init; }

	/// <summary>
	/// Gets name of the player.
	/// </summary>
	[JsonPropertyName("name")]
	public string Name { get; init; } = string.Empty;

	/// <summary>
	/// Gets country code of the player.
	/// </summary>
	[JsonPropertyName("country_code")]
	public string CountryCode { get; init; } = string.Empty;

	/// <summary>
	/// Gets team ID of the player.
	/// </summary>
	[JsonPropertyName("team_id")]
	public long? TeamId { get; init; }

	/// <summary>
	/// Gets team name of the player.
	/// </summary>
	[JsonPropertyName("team_name")]
	public string TeamName { get; init; }

	/// <summary>
	/// Gets team tag of the player.
	/// </summary>
	[JsonPropertyName("team_tag")]
	public string TeamTag { get; init; }

	/// <summary>
	/// Gets whether the player is locked.
	/// </summary>
	[JsonPropertyName("is_locked")]
	public BooleanState? IsLocked { get; init; }

	/// <summary>
	/// Gets whether the player is pro.
	/// </summary>
	[JsonPropertyName("is_pro")]
	public BooleanState? IsPro { get; init; }

	/// <summary>
	/// Gets when the player is locked.
	/// </summary>
	[JsonPropertyName("locked_until")]
	public object? LockedUntil { get; init; }

	/// <summary>
	/// Gets Steam ID of the player.
	/// </summary>
	[JsonPropertyName("steamid")]
	public string SteamId { get; init; } = string.Empty;

	/// <summary>
	/// Gets avatar of the player.
	/// </summary>
	[JsonPropertyName("avatar")]
	public Uri? Avatar { get; init; }

	/// <summary>
	/// Gets medium avatar of the player.
	/// </summary>
	[JsonPropertyName("avatarmedium")]
	public Uri? AvatarMedium { get; init; }

	/// <summary>
	/// Gets full avatar of the player.
	/// </summary>
	[JsonPropertyName("avatarfull")]
	public Uri? AvatarFull { get; init; }

	/// <summary>
	/// Gets profile URL of the player.
	/// </summary>
	[JsonPropertyName("profileurl")]
	public Uri? ProfileUrl { get; init; }

	/// <summary>
	/// Gets persona name of the player.
	/// </summary>
	[JsonPropertyName("personaname")]
	public string PersonaName { get; init; } = string.Empty;

	/// <summary>
	/// Gets last login of the player.
	/// </summary>
	[JsonPropertyName("last_login")]
	public DateTimeOffset? LastLogin { get; init; }

	/// <summary>
	/// Gets full history time of the player.
	/// </summary>
	[JsonPropertyName("full_history_time")]
	public DateTimeOffset? FullHistoryTime { get; init; }

	/// <summary>
	/// Gets cheese of the player.
	/// </summary>
	[JsonPropertyName("cheese")]
	public long Cheese { get; init; }

	/// <summary>
	/// Gets whether the player is fh unavailable.
	/// </summary>
	[JsonPropertyName("fh_unavailable")]
	public BooleanState? FhUnavailable { get; init; }

	/// <summary>
	/// Gets location country code of the player.
	/// </summary>
	[JsonPropertyName("loccountrycode")]
	public string LocCountryCode { get; init; }

	/// <summary>
	/// Gets last match time of the player.
	/// </summary>
	[JsonPropertyName("last_match_time")]
	public DateTimeOffset LastMatchTime { get; init; }

	/// <summary>
	/// Gets whether the player is plus.
	/// </summary>
	[JsonPropertyName("plus")]
	public BooleanState Plus { get; init; }

	/// <summary>
	/// Gets last played of the player.
	/// </summary>
	[JsonPropertyName("last_played")]
	public long LastPlayed { get; init; }

	/// <summary>
	/// Gets win of the player.
	/// </summary>
	[JsonPropertyName("win")]
	public long Win { get; init; }

	/// <summary>
	/// Gets games of the player.
	/// </summary>
	[JsonPropertyName("games")]
	public long Games { get; init; }

	/// <summary>
	/// Gets with win of the player.
	/// </summary>
	[JsonPropertyName("with_win")]
	public long WithWin { get; init; }

	/// <summary>
	/// Gets with games of the player.
	/// </summary>
	[JsonPropertyName("with_games")]
	public long WithGames { get; init; }

	/// <summary>
	/// Gets against win of the player.
	/// </summary>
	[JsonPropertyName("against_win")]
	public long AgainstWin { get; init; }

	/// <summary>
	/// Gets against games of the player.
	/// </summary>
	[JsonPropertyName("against_games")]
	public long AgainstGames { get; init; }

	/// <summary>
	/// Gets with gold per minute sum of the player.
	/// </summary>
	[JsonPropertyName("with_gpm_sum")]
	public long? WithGpmSum { get; init; }

	/// <summary>
	/// Gets with xp per minute sum of the player.
	/// </summary>
	[JsonPropertyName("with_xpm_sum")]
	public long? WithXpmSum { get; init; }
}
