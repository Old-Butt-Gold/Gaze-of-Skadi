using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;

namespace GoS.Domain.Players.Models;

public class Player
{
	/// <summary>
	/// Gets the rank tier.
	/// </summary>
	[JsonPropertyName("rank_tier")]
	public Rank? RankTier { get; init; }

	/// <summary>
	/// Gets the leaderboard rank.
	/// </summary>
	[JsonPropertyName("leaderboard_rank")]
	public int? LeaderboardRank { get; init; }

	/// <summary>
	/// Gets the profile.
	/// </summary>
	[JsonPropertyName("profile")]
	public ProfileInfo Profile { get; init; } = new();

    [JsonPropertyName("aliases")]
    public IEnumerable<Alias> Aliases { get; set; } = [];
}

public class Alias
{
    [JsonPropertyName("personaname")]
    public string PersonaName { get; init; } = string.Empty;

    [JsonPropertyName("name_since")]
    public DateTimeOffset NameSince { get; init; }
}

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
