using GoS.Application.Dto;
using GoS.Domain.BaseEnums;
using GoS.Domain.Players.Enums;

namespace GoS.Application.Features.Players.Queries.GetPlayerRecord;

public class PlayerRecordDto
{
	public long MatchId { get; init; }

    /// TODO if match parsed or not. if not then it's null
    public int? Version { get; init; }

	public BaseEnumDto<BooleanState> IsRadiant { get; init; }

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

    // TODO should be -1 from .json file
	public int? HeroVariant { get; init; }

    public int? PartySize { get; init; }

    public Dictionary<PlayerFieldHistogram, object>? RecordFields { get; set; }
}
