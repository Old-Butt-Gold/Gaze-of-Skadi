using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;
using GoS.Domain.Matches.Enums;

namespace GoS.Domain.Matches.Models;

public class BuybackLog
{
	/// <summary>
	/// Gets time in seconds the buyback occurred
	/// </summary>
	[JsonPropertyName("time")]
	public int Time { get; init; }

	/// <summary>
	/// Gets which slot the buyback occurred
	/// </summary>
	[JsonPropertyName("slot")]
	public PlayerSlotSequence Slot { get; init; }

	/// <summary>
	/// Gets type of action (buyback_log)
	/// </summary>
	[JsonPropertyName("type")]
	public LogType Type { get; init; }

	/// <summary>
	/// Gets which slot the player is in. 0-127 are Radiant, 128-255 are Dire.
	/// </summary>
	[JsonPropertyName("player_slot")]
	public PlayerSlot PlayerSlot { get; init; }
}
