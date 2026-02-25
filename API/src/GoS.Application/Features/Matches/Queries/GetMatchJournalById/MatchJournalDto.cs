using GoS.Application.Dto;
using GoS.Domain.BaseEnums;
using GoS.Domain.Matches.Enums;

namespace GoS.Application.Features.Matches.Queries.GetMatchJournalById;

public interface ITimebleDto
{
    public long Time { get; init; }
}

public record ObjectiveEventDto : ITimebleDto
{
    public required long Time { get; init; }
    public required BaseEnumDto<ObjectiveType> Type { get; init; }
    public required int? PlayerIndex { get; init; }
    public required string? Target { get; init; }
    public required BaseEnumDto<TeamEnum>? TargetTeam { get; init; }
}

public record BuybackEventDto : ITimebleDto
{
    public required long Time { get; init; }
    public required int PlayerIndex { get; init; }
}

public record ConnectionEventDto : ITimebleDto
{
    public required long Time { get; init; }
    public required BaseEnumDto<ConnectionEvent> Event { get; init; }
    public required int PlayerIndex { get; init; }
}

public record KillEventDto : ITimebleDto
{
    public required long Time { get; init; }
    public required int KillerIndex { get; init; }
    public required int VictimHeroId { get; init; }
}

public record RuneEventDto : ITimebleDto
{
    public required long Time { get; init; }
    public required BaseEnumDto<Runes> Rune { get; init; }
    public required int PlayerIndex { get; init; }
}

public record MatchJournalDto
{
    public required IEnumerable<ObjectiveEventDto> Objectives { get; init; }
    public required IEnumerable<BuybackEventDto> Buybacks { get; init; }
    public required IEnumerable<ConnectionEventDto> Connections { get; init; }
    public required IEnumerable<KillEventDto> Kills { get; init; }
    public required IEnumerable<RuneEventDto> Runes { get; init; }
}
