using GoS.Application.Dto;
using GoS.Domain.BaseEnums;
using GoS.Domain.Matches.Enums;

namespace GoS.Application.Features.Matches.Queries.GetMatchTeamfightsById;

public record TeamfightPositionDto
{
    public required int X { get; init; }
    public required int Y { get; init; }
    public required int Count { get; init; }
}

public record AbilityUseDto
{
    public required string AbilityKey { get; init; }
    public required long Uses { get; init; }
}

public record ItemUseDto
{
    public required string ItemKey { get; init; }
    public required long Uses { get; init; }
}

public record KilledHeroDto
{
    public required long HeroId { get; init; }
    public required long Times { get; init; }
}

public record TeamfightPlayerDto
{
    public required int PlayerIndex { get; init; }
    public required bool WasDead { get; init; }
    public required long Damage { get; init; }
    public required long Healing { get; init; }
    public required long GoldDelta { get; init; }
    public required long XpDelta { get; init; }
    public required bool UsedBuyback { get; init; }
    public required IEnumerable<AbilityUseDto> AbilityUses { get; init; }
    public required IEnumerable<ItemUseDto> ItemUses { get; init; }
    public required IEnumerable<KilledHeroDto> KilledHeroes { get; init; }
    public required IEnumerable<TeamfightPositionDto> DeathPositions { get; init; }
}

public record TeamfightDetailedDto
{
    public required long Start { get; init; }
    public required long End { get; init; }
    public required long TotalDeaths { get; init; }
    public required long LastDeathTime { get; init; }
    public required long XpAdvantage { get; init; }
    public required long GoldAdvantage { get; init; }
    public required BaseEnumDto<TeamEnum> Winner { get; init; }
    public required IEnumerable<TeamfightPlayerDto> Players { get; init; }
}

public record ObjectiveDto
{
    public required long Time { get; init; }
    public required BaseEnumDto<ObjectiveType> Type { get; init; }
    public required int? KillerPlayerIndex { get; init; }
    public required int? VictimPlayerIndex { get; init; }
}

public record TotalTeamfightInformationDto
{
    public required IEnumerable<ObjectiveDto> Objectives { get; init; }
    public required IEnumerable<TeamfightDetailedDto> Teamfights { get; init; }
}
