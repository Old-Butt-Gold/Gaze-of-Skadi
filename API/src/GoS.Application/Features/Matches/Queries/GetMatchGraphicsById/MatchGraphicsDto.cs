using GoS.Application.Dto;
using GoS.Application.Features.Matches.Queries.GetMatchOverviewById;
using GoS.Domain.Matches.Enums;

namespace GoS.Application.Features.Matches.Queries.GetMatchGraphicsById;

// TODO move it to GetMatchTeamFightsByIdHandler
public record ObjectiveDto
{
    public required long Time { get; init; }
    public required BaseEnumDto<ObjectiveType> Type { get; init; }
    public required int? KillerPlayerIndex { get; init; }
    public required int? VictimPlayerIndex { get; init; }
}

public record MinuteValueDto
{
    public required int Minute { get; init; }
    public required int Value { get; init; }
}

public record PlayerGraphsDto
{
    public required int PlayerIndex { get; init; }
    public required IEnumerable<MinuteValueDto> GoldPerMinute { get; init; }
    public required IEnumerable<MinuteValueDto> XpPerMinute { get; init; }
    public required IEnumerable<MinuteValueDto> LastHitsPerMinute { get; init; }
}

public record MatchGraphicsDto
{
    public required IEnumerable<ObjectiveDto> Objectives { get; init; }
    public required IEnumerable<TeamAdvantageDto> TeamAdvantages { get; init; }
    public required IEnumerable<PlayerGraphsDto> PlayerGraphs { get; init; }
}
