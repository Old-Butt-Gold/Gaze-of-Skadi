using GoS.Domain.BaseEnums;
using GoS.Domain.Players.Enums;

namespace GoS.Application.EndpointParameters;

/// <summary>
/// Represents player endpoint parameters.
/// </summary>
public class PlayerEndpointParameters
{
	/// <summary>
	/// Gets the number of matches to limit to.
	/// </summary>
	public int? Limit { get; set; }

	/// <summary>
	/// Gets the number of matches to offset start by.
	/// </summary>
	public int? Offset { get; set; }

	/// <summary>
	/// Gets whether the player won.
	/// </summary>
	public int? Win { get; set; }

	/// <summary>
	/// Gets the patch ID.
	/// </summary>
	public Patch? Patch { get; set; }

	/// <summary>
	/// Gets an integer corresponding to game mode played.
	/// List of constants can be found here: https://github.com/odota/dotaconstants/blob/master/json/game_mode.json.
	/// </summary>
	public GameMode? GameMode { get; set; }

	/// <summary>
	/// Gets integer corresponding to lobby type of match.
	/// List of constants can be found here: https://github.com/odota/dotaconstants/blob/master/json/lobby_type.json.
	/// </summary>
	public LobbyType? LobbyType { get; set; }

	/// <summary>
	/// Gets the region ID.
	/// </summary>
	public Region? Region { get; set; }

	/// <summary>
	/// Gets the days previous.
	/// </summary>
	public int? Date { get; set; }

	/// <summary>
	/// Gets the lane Role ID.
	/// </summary>
	public LaneRole? LaneRole { get; set; }

	/// <summary>
	/// Gets the ID value of the hero played.
	/// </summary>
	public int? HeroId { get; set; }

	/// <summary>
	/// Gets whether the player was radiant.
	/// </summary>
	public int? IsRadiant { get; set; }

	/// <summary>
	/// Gets the hero IDs on the player's team (array).
	/// </summary>
	public List<int>? WithHeroIds { get; set; }

	/// <summary>
	/// Gets the hero IDs against the player's team (array).
	/// </summary>
	public List<int>? AgainstHeroIds { get; set; }

	/// <summary>
	/// Gets the minimum number of games played, for filtering hero stats.
	/// </summary>
	public int? Having { get; set; }

    public List<int>? IncludedPlayersIds { get; set; }

    /// <summary>
    /// Gets the size of the party player played with
    /// </summary>
    public int? PartySize { get; set; }

	/// <summary>
	/// Gets the field to return matches sorted by in descending order.
	/// </summary>
	public PlayerFieldHistogram? Sort { get; set; }

	/// <summary>
	/// Gets the fields to project (array).
	/// </summary>
	public List<string> Project { get; set; } = [];
}
