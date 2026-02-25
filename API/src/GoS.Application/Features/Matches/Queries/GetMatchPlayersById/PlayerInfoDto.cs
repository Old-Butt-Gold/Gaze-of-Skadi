using GoS.Application.Dto;
using GoS.Domain.BaseEnums;

namespace GoS.Application.Features.Matches.Queries.GetMatchPlayersById;

public class MatchPlayerInformationDto
{
    public required BaseEnumDto<BooleanState> IsMatchParsed { get; init; }
    public required IEnumerable<PlayerInfoDto> Players { get; init; }
}

public class PlayerInfoDto
{
    public long HeroId { get; init; }

    // May be unknown
    public string? PersonaName { get; init; }

    public int? HeroVariant { get; init; }

    public long? AccountId { get; set; }

    public required BaseEnumDto<PlayerSlot> PlayerSlot { get; init; }

    public required BaseEnumDto<LeaverStatus>? LeaverStatus { get; init; }

    public required BaseEnumDto<LaneRole> LaneRole { get; init; }

    public BaseEnumDto<Rank>? RankTier { get; init; }

    public required BaseEnumDto<BooleanState> IsRadiant { get; init; }

    public int? PartySize { get; init; }
}
