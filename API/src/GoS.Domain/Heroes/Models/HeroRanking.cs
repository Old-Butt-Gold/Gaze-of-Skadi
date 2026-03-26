using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;

namespace GoS.Domain.Heroes.Models;

/// <summary>
/// Represents a hero ranking.
/// </summary>
public class HeroRanking
{
	/// <summary>
	/// Gets the ID value of the hero played.
	/// </summary>
	[JsonPropertyName("hero_id")]
	public long HeroId { get; init; }

	/// <summary>
	/// Gets the rankings of the hero.
	/// </summary>
	[JsonPropertyName("rankings")]
	public IEnumerable<RankingPlayer> Rankings { get; init; } = [];
}

/// <summary>
/// Represents a ranking player.
/// </summary>
public class RankingPlayer
{
    /// <summary>
    /// Gets account ID of the player.
    /// </summary>
    [JsonPropertyName("account_id")]
    public long AccountId { get; init; }

    /// <summary>
    /// Gets score of the player.
    /// </summary>
    [JsonPropertyName("score")]
    public double Score { get; init; }

    /// <summary>
    /// Gets persona name of the player.
    /// </summary>
    [JsonPropertyName("personaname")]
    public string PersonaName { get; init; } = string.Empty;

    /// <summary>
    /// Gets name of the player.
    /// </summary>
    [JsonPropertyName("name")]
    public string Name { get; init; } = string.Empty;

    /// <summary>
    /// Gets avatar of the player.
    /// </summary>
    [JsonPropertyName("avatar")]
    public Uri? Avatar { get; init; }

    /// <summary>
    /// Gets last login of the player.
    /// </summary>
    [JsonPropertyName("last_login")]
    public DateTimeOffset? LastLogin { get; init; }

    /// <summary>
    /// Gets rank tier of the player.
    /// </summary>
    [JsonPropertyName("rank_tier")]
    public Rank? RankTier { get; init; }
}
