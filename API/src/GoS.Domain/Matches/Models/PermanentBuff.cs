using System.Text.Json.Serialization;
using GoS.Domain.Matches.Enums;

namespace GoS.Domain.Matches.Models;

/// <summary>
/// Represents a permanent buff.
/// </summary>
public class PermanentBuff
{
	/// <summary>
	/// Gets the list of constants can be found here: https://github.com/odota/dotaconstants/blob/master/json/permanent_buffs.json
	/// </summary>
	[JsonPropertyName("permanent_buff")]
	public PermanentBuffEnum PermanentBuffEnum { get; init; }

	/// <summary>
	/// Gets a stack count
	/// </summary>
	[JsonPropertyName("stack_count")]
	public long StackCount { get; init; }

    /// <summary>
    /// Gets a grant time
    /// </summary>
    [JsonPropertyName("grant_time")]
    public int GrantTime { get; init; }
}
