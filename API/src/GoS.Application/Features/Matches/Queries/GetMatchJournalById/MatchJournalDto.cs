using GoS.Application.Dto;
using GoS.Domain.BaseEnums;
using GoS.Domain.Matches.Enums;

namespace GoS.Application.Features.Matches.Queries.GetMatchJournalById;

public record ObjectiveEventDto
{
    public required long Time { get; init; }
    public required BaseEnumDto<ObjectiveType> Type { get; init; }
    public required PlayerInfoDto? Player { get; init; }
    public required string? Target { get; init; }
    public required BaseEnumDto<TeamEnum>? TargetTeam { get; init; }
}

public record BuybackEventDto
{
    public required long Time { get; init; }
    public required PlayerInfoDto Player { get; init; }
}

public record ConnectionEventDto
{
    public required long Time { get; init; }
    public required BaseEnumDto<ConnectionEvent> Event { get; init; }
    public required PlayerInfoDto Player { get; init; }
}

public record KillEventDto
{
    public required long Time { get; init; }
    public required PlayerInfoDto Killer { get; init; }
    public required int VictimHeroId { get; init; }
}

public record RuneEventDto
{
    public required long Time { get; init; }
    public required BaseEnumDto<Runes> Rune { get; init; }
    public required PlayerInfoDto Player { get; init; }
}

public record TeamFightEventDto
{
    public required long StartTime { get; init; }
    public required long EndTime { get; init; }
}

public record MatchJournalDto
{
    public required IEnumerable<ObjectiveEventDto> Objectives { get; init; }
    public required IEnumerable<BuybackEventDto> Buybacks { get; init; }
    public required IEnumerable<ConnectionEventDto> Connections { get; init; }
    public required IEnumerable<KillEventDto> Kills { get; init; }
    public required IEnumerable<RuneEventDto> Runes { get; init; }
    public required IEnumerable<TeamFightEventDto> TeamFights { get; init; }
}