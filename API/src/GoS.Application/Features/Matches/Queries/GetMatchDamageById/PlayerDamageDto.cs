namespace GoS.Application.Features.Matches.Queries.GetMatchDamageById;

public record HeroKillsDto
{
    public required long HeroId { get; init; }
    public required int Times { get; init; }
}

public record HeroDamageDto
{
    public required long HeroId { get; init; }
    public required int Damage { get; init; }
}

public record DamageBreakdownDto
{
    public required long TargetHeroId { get; init; }
    public required int Damage { get; init; }
}

public record DamageInflictorDto
{
    public required string InflictorKey { get; init; }
    public required int TotalDamage { get; init; }
    public required IEnumerable<DamageBreakdownDto> Breakdown { get; init; }
}

public record DamageSummaryDto
{
    public required string InflictorKey { get; init; }
    public required int TotalDamage { get; init; }
}

public record PlayerDamageDto
{
    public required int PlayerIndex { get; init; }
    public required IEnumerable<HeroKillsDto> KilledHeroes { get; init; }
    public required IEnumerable<HeroKillsDto> KilledByHeroes { get; init; }
    public required IEnumerable<HeroDamageDto> DamageDealtToHeroes { get; init; }
    public required IEnumerable<HeroDamageDto> DamageTakenFromHeroes { get; init; }
    public required IEnumerable<DamageInflictorDto> DamageDealtByInflictor { get; init; }
    public required IEnumerable<DamageSummaryDto> DamageTakenByInflictor { get; init; }
}
