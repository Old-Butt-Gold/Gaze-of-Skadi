using GoS.Application.Dto;
using GoS.Domain.BaseEnums;

namespace GoS.Application.Features.Players.Queries.GetPlayerRecord;

public class PlayerRecordDto
{
	public long MatchId { get; init; }

    /// TODO if match parsed or not. if not then it's null
    public int? Version { get; init; }

	public required BaseEnumDto<BooleanState> IsRadiant { get; init; }

	public required BaseEnumDto<BooleanState> RadiantWin { get; init; }

	public required BaseEnumDto<GameMode> GameMode { get; init; }

	public required BaseEnumDto<LobbyType> LobbyType { get; init; }

	public int HeroId { get; init; }

	public long StartTime { get; init; }

	public required BaseEnumDto<LeaverStatus> LeaverStatus { get; init; }

	public int? HeroVariant { get; init; }

    public int? PartySize { get; init; }

    public string RecordField { get; set; } = string.Empty;
}
