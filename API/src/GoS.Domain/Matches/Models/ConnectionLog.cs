using System.Text.Json.Serialization;
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
	/// Gets game time in seconds the event ocurred
	/// </summary>
	[JsonPropertyName("time")]
	public long Time { get; init; }
}
