using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;

namespace GoS.Domain.Teams.Models;

/// <summary>
/// Represents a team player.
/// </summary>
public class TeamPlayer
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
	public string? Name { get; init; }

	/// <summary>
	/// Gets number of games played by the player.
	/// </summary>
	[JsonPropertyName("games_played")]
	public long GamesPlayed { get; init; }

	/// <summary>
	/// Gets number of wins by the player.
	/// </summary>
	[JsonPropertyName("wins")]
	public long Wins { get; init; }

	/// <summary>
	/// Gets whether the player is the current team member.
	/// </summary>
	[JsonPropertyName("is_current_team_member")]
	public BooleanState? IsCurrentTeamMember { get; init; }
}
