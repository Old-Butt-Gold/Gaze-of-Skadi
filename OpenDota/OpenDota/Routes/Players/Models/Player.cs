using System.Text.Json.Serialization;
using OpenDota.Enums;
using OpenDota.Enums.Changeable;

namespace OpenDota.Routes.Players.Models;

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
	public Profile Profile { get; init; } = new();
}
