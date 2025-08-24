using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;

namespace GoS.Domain.Matches.Models;

/// <summary>
/// Represents a pick or ban
/// </summary>
public class PickBan
{
	/// <summary>
	/// Gets whether it was picked or banned. False means the hero was banned, true means the hero was picked.
	/// </summary>
	[JsonPropertyName("is_pick")]
	public BooleanState? IsPick { get; init; }

	/// <summary>
	/// Gets the ID value of the hero picked or banned.
	/// </summary>
	[JsonPropertyName("hero_id")]
	public int HeroId { get; init; }

	/// <summary>
	/// Gets team that picked or banned the hero
	/// </summary>
	[JsonPropertyName("team")]
	public TeamEnum TeamEnum { get; init; }

	/// <summary>
	/// Gets order of pick or ban
	/// </summary>
	[JsonPropertyName("order")]
	public int Order { get; init; }
}
