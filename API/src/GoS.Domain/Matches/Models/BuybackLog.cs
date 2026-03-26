using System.Text.Json.Serialization;

namespace GoS.Domain.Matches.Models;

public class BuybackLog
{
	/// <summary>
	/// Gets time in seconds the buyback occurred
	/// </summary>
	[JsonPropertyName("time")]
	public int Time { get; init; }
}
