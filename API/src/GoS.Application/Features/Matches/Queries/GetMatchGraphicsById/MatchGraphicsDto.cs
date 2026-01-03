using GoS.Application.Dto;
using GoS.Domain.Matches.Enums;

namespace GoS.Application.Features.Matches.Queries.GetMatchGraphicsById;

public record ObjectiveDto
{
    public required long Time { get; init; }
    public required BaseEnumDto<ObjectiveType> Type { get; init; }
    public required PlayerInfoDto? KillerPlayer { get; init; }
    public required PlayerInfoDto? VictimPlayer { get; init; }
}

public record TeamfightPlayerStateDto
{
    public required PlayerInfoDto PlayerInfo { get; init; }
    public required long GoldDelta { get; init; }
    public required bool WasDead { get; init; }
}

public record TeamfightDto
{
    public required long Start { get; init; }
    public required long End { get; init; }
    public required long Deaths { get; init; }
    public required IEnumerable<TeamfightPlayerStateDto> Players { get; init; }
}

public record TeamAdvantageDto
{
    public required int Minute { get; init; }
    public required int RadiantGoldAdvantage { get; init; }
    public required int RadiantXpAdvantage { get; init; }
}

public record MinuteValueDto
{
    public required int Minute { get; init; }
    public required int Value { get; init; }
}

public record PlayerGraphsDto
{
    public required PlayerInfoDto PlayerInfo { get; init; }
    public required IEnumerable<MinuteValueDto> GoldPerMinute { get; init; }
    public required IEnumerable<MinuteValueDto> XpPerMinute { get; init; }
    public required IEnumerable<MinuteValueDto> LastHitsPerMinute { get; init; }
}

public record MatchGraphicsDto
{
    public required IEnumerable<ObjectiveDto> Objectives { get; init; }
    public required IEnumerable<TeamfightDto> Teamfights { get; init; }
    public required IEnumerable<TeamAdvantageDto> TeamAdvantages { get; init; }
    public required IEnumerable<PlayerGraphsDto> PlayerGraphs { get; init; }
}