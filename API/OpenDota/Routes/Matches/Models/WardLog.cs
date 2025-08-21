using System.Text.Json.Serialization;
using OpenDota.Enums;
using OpenDota.Enums.Changeable;
using OpenDota.Enums.Permanent;

namespace OpenDota.Routes.Matches.Models;

/// <summary>
/// Represents a ward log
/// </summary>
public class WardLog
{
	/// <summary>
	/// Gets an attacker name
	/// </summary>
	[JsonPropertyName("attackername")]
	public string? AttackerName { get; init; }

	/// <summary>
	/// Gets a ehandle...
	/// </summary>
	[JsonPropertyName("ehandle")]
	public long Ehandle { get; init; }

	/// <summary>
	/// Gets an entity left
	/// </summary>
	[JsonPropertyName("entityleft")]
	public BooleanState EntityLeft { get; init; }

	/// <summary>
	/// Gets a key
	/// </summary>
	[JsonPropertyName("key")]
	public string Key { get; init; } = string.Empty;

	/// <summary>
	/// Gets which slot the player is in. 0-127 are Radiant, 128-255 are Dire.
	/// </summary>
	[JsonPropertyName("player_slot")]
	public PlayerSlot PlayerSlot { get; init; }

	/// <summary>
	/// Gets a slot
	/// </summary>
	[JsonPropertyName("slot")]
	public PlayerSlotSequence Slot { get; init; }

	/// <summary>
	/// Gets a time
	/// </summary>
	[JsonPropertyName("time")]
	public int Time { get; init; }

	/// <summary>
	/// Gets a type
	/// </summary>
	[JsonPropertyName("type")]
	public LogType Type { get; init; }

	/// <summary>
	/// Gets a X coordinate
	/// </summary>
	[JsonPropertyName("x")]
	public double X { get; init; }

	/// <summary>
	/// Gets a Y coordinate
	/// </summary>
	[JsonPropertyName("y")]
	public double Y { get; init; }

	/// <summary>
	/// Gets a Z coordinate
	/// </summary>
	[JsonPropertyName("z")]
	public double Z { get; init; }
}
