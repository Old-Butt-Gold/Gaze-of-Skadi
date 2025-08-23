using System.Text.Json.Serialization;

namespace GoS.Domain.Players.Models;

/// <summary>
/// Represents player peer.
/// </summary>
public class PlayerPeer
{
	/// <summary>
	/// Gets account ID of the player.
	/// </summary>
	[JsonPropertyName("account_id")]
	public long AccountId { get; init; }

	/// <summary>
	/// Gets the last time the player played.
	/// </summary>
	[JsonPropertyName("last_played")]
	public long LastPlayed { get; init; }

	/// <summary>
	/// Gets the win rate of the player.
	/// </summary>
	[JsonPropertyName("win")]
	public int Win { get; init; }

	/// <summary>
	/// Gets the game count of the player.
	/// </summary>
	[JsonPropertyName("games")]
	public int Games { get; init; }

	/// <summary>
	/// Gets the win rate of the player against other players.
	/// </summary>
	[JsonPropertyName("with_win")]
	public int WithWin { get; init; }

	/// <summary>
	/// Gets the game count of the player against other players.
	/// </summary>
	[JsonPropertyName("with_games")]
	public int WithGames { get; init; }

	/// <summary>
	/// Gets the win rate of the player against other players.
	/// </summary>
	[JsonPropertyName("against_win")]
	public int AgainstWin { get; init; }

	/// <summary>
	/// Gets the game count of the player against other players.
	/// </summary>
	[JsonPropertyName("against_games")]
	public int AgainstGames { get; init; }

	/// <summary>
	/// Gets the with gold per minute of the player.
	/// </summary>
	[JsonPropertyName("with_gpm_sum")]
	public int WithGpmSum { get; init; }

	/// <summary>
	/// Gets the with gold per minute of the player.
	/// </summary>
	[JsonPropertyName("with_xpm_sum")]
	public int WithXpmSum { get; init; }

	/// <summary>
	/// Gets the personaname of the player.
	/// </summary>
	[JsonPropertyName("personaname")]
	public string Personaname { get; init; } = string.Empty;

	/// <summary>
	/// Gets the name of the player.
	/// </summary>
	[JsonPropertyName("name")]
	public string Name { get; init; } = string.Empty;

	/// <summary>
	/// Gets the last time the player logged in.
	/// </summary>
	[JsonPropertyName("last_login")]
	public DateTimeOffset? LastLogin { get; init; }

	/// <summary>
	/// Gets the avatar of the player.
	/// </summary>
	[JsonPropertyName("avatar")]
	public Uri? Avatar { get; init; }

	/// <summary>
	/// Gets the avatar full of the player.
	/// </summary>
	[JsonPropertyName("avatarfull")]
	public Uri? AvatarFull { get; init; }
}
