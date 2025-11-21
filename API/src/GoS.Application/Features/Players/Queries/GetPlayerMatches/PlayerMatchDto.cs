using GoS.Application.Dto;
using GoS.Domain.BaseEnums;

namespace GoS.Application.Features.Players.Queries.GetPlayerMatches;

public class PlayerMatchDto
{
	public long MatchId { get; init; }

    /// TODO if match parsed or not. if not then it's null
    public int? Version { get; init; }

	public BaseEnumDto<BooleanState> IsRadiant { get; set; }

	public BaseEnumDto<BooleanState>? RadiantWin { get; init; }

	public int Duration { get; init; }

	public BaseEnumDto<GameMode> GameMode { get; init; }

	public BaseEnumDto<LobbyType> LobbyType { get; init; }

	public int HeroId { get; init; }

	public long StartTime { get; init; }

	public int Kills { get; init; }

	public int Deaths { get; init; }

	public int Assists { get; init; }

	public BaseEnumDto<LeaverStatus> LeaverStatus { get; init; }

	public int? Level { get; init; }

    // TODO should be -1 from .json file
	public int? HeroVariant { get; init; }

	public int? Item0 { get; init; }

	public int? Item1 { get; init; }

	public int? Item2 { get; init; }

	public int? Item3 { get; init; }

	public int? Item4 { get; init; }

	public int? Item5 { get; init; }

	public Dictionary<PlayerSlot, PlayerMatchHeroDto>? Heroes { get; init; }

	public BaseEnumDto<LaneRole>? Lane { get; init; }
}

public class PlayerMatchHeroDto
{
    public long HeroId { get; init; }
}
