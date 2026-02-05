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
