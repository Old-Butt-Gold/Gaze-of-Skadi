using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;

namespace GoS.Domain.Search.Models;

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
	public string? SteamId { get; init; }

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
	public string? PersonaName { get; init; }

	/// <summary>
	/// Gets player's country identifier, e.g. US.
	/// </summary>
	[JsonPropertyName("loccountrycode")]
	public string? LocCountryCode { get; init; }

	/// <summary>
	/// Gets last match time.
	/// </summary>
	[JsonPropertyName("last_match_time")]
	public DateTimeOffset? LastMatchTime { get; init; }

	/// <summary>
	/// Gets plus.
	/// </summary>
	[JsonPropertyName("plus")]
	public BooleanState? HaveDotaPlus { get; init; }

	/// <summary>
	/// Gets verified player name, e.g. 'Miracle-'.
	/// </summary>
	[JsonPropertyName("name")]
	public string Name { get; init; } = string.Empty;

	/// <summary>
	/// Gets player's country code.
	/// </summary>
	[JsonPropertyName("country_code")]
	public string? CountryCode { get; init; }

	/// <summary>
	/// Gets player's team identifier.
	/// </summary>
	[JsonPropertyName("team_id")]
	public long? TeamId { get; init; }

	/// <summary>
	/// Gets player's team name, e.g. 'Evil Geniuses'.
	/// </summary>
	[JsonPropertyName("team_name")]
	public string? TeamName { get; init; }

	/// <summary>
	/// Gets a value indicating whether the roster lock is active.
	/// </summary>
	[JsonPropertyName("is_locked")]
	public BooleanState? IsLocked { get; init; }

	/// <summary>
	/// Gets a value indicating whether the player is professional or not.
	/// </summary>
	[JsonPropertyName("is_pro")]
	public BooleanState? IsPro { get; init; }

    /// <summary>
    /// Gets a value indicating whether the player is analyzable or not.
    /// </summary>
    [JsonPropertyName("fh_unavailable")]
    public BooleanState? FullHistoryUnavailable { get; init; }
}
