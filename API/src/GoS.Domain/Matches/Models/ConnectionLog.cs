using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;
using GoS.Domain.Matches.Enums;

namespace GoS.Domain.Matches.Models;

/// <summary>
/// Represents a connection log
/// </summary>
public class ConnectionLog
{
	/// <summary>
	/// Gets event that occurred (connect, reconnect, disconnect)
	/// </summary>
	[JsonPropertyName("event")]
	public ConnectionEvent Event { get; init; }

	/// <summary>
	/// Gets which slot the player is in. 0-127 are Radiant, 128-255 are Dire.
	/// </summary>
	[JsonPropertyName("player_slot")]
	public PlayerSlot PlayerSlot { get; init; }

	/// <summary>
	/// Gets which slot.
	/// </summary>
	[JsonPropertyName("slot")]
	public PlayerSlotSequence Slot { get; init; }

	/// <summary>
	/// Gets game time in seconds the event ocurred
	/// </summary>
	[JsonPropertyName("time")]
	public long Time { get; init; }

	/// <summary>
	/// Gets type of log (should always be "connection_log")
	/// </summary>
	[JsonPropertyName("type")]
	public LogType Type { get; init; }
}
