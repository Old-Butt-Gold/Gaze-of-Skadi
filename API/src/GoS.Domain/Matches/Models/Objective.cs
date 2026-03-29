using System.Text.Json;
using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;
using GoS.Domain.Matches.Enums;

namespace GoS.Domain.Matches.Models;

/// <summary>
/// Contains information about an objective.
/// </summary>
public class Objective
{
	/// <summary>
	/// Gets time (in seconds) when the objective happened
	/// </summary>
	[JsonPropertyName("time")]
	public long? Time { get; init; }

	/// <summary>
	/// Gets type of objective (courier kill, tower kill, first blood, etc)
	/// </summary>
	[JsonPropertyName("type")]
	public ObjectiveType Type { get; init; }

	/// <summary>
	/// Gets which slot the objective happened in
	/// </summary>
	[JsonPropertyName("slot")]
	public PlayerSlotSequence? Slot { get; init; }

	/// <summary>
	/// Gets integers and strings
	/// </summary>
	[JsonPropertyName("key")]
	public JsonElement? Key { get; init; }

    // USED ONLY FOR COURIER LOST

    /// <summary>
    /// Used only to when courier was lost
    /// </summary>
    [JsonPropertyName("killer")]
    public PlayerSlot? Killer { get; init; }

    /// <summary>
    /// What team killed it, 1 – Radiant, 2 – Dire
    /// </summary>
    public int? Team { get; init; }
}
