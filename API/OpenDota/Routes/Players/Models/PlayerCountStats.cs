using System.Text.Json.Serialization;

namespace OpenDota.Routes.Players.Models;

public class PlayerCountStats
{
	/// <summary>
	/// Gets the total number of games
	/// </summary>
	[JsonPropertyName("games")]
	public long Games { get; init; }

	/// <summary>
	/// Gets the total number of wins
	/// </summary>
	[JsonPropertyName("win")]
	public long Win { get; init; }
}
