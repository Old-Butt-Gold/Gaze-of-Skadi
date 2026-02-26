using GoS.Application.Dto;
using GoS.Application.Features.Common.Queries.GetLeagues;
using GoS.Domain.BaseEnums;

namespace GoS.Application.Features.Matches.Queries.GetMatchGeneralInformationById;

public class MatchGeneralInformationDto
{
    public required BaseEnumDto<BooleanState> IsMatchParsed { get; init; }
    public required IEnumerable<PlayerInfoDto> Players { get; init; }
    public required MatchHeaderInformationDto MatchGeneral { get; init; }
}

public class MatchTeamDto
{
    public int TeamId { get; init; }

    public string Name { get; init; } = string.Empty;

    public Uri? LogoUrl { get; init; }
}

public record MatchHeaderInformationDto
{
    public required BaseEnumDto<TeamEnum> Winner { get; init; }
    public required int RadiantScore { get; init; }
    public required int DireScore { get; init; }
    public required BaseEnumDto<GameMode> GameMode { get; init; }
    public required BaseEnumDto<LobbyType> LobbyType { get; set; }
    public required int Duration { get; init; }
    public required long StartTime { get; set; }
    public required BaseEnumDto<Region> Region { get; init; }
    public required BaseEnumDto<Patch> Patch { get; set; }
    public required Uri? ReplayUrl { get; init; }
    public required MatchTeamDto? RadiantTeam { get; set; }
    public required MatchTeamDto? DireTeam { get; set; }
    public required LeagueDto? League { get; set; }
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
