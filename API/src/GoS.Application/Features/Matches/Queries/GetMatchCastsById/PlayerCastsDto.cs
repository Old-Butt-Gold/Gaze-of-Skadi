namespace GoS.Application.Features.Matches.Queries.GetMatchCastsById;

public record PlayerCastsDto
{
    public required int PlayerIndex { get; init; }

    public required IEnumerable<AbilityCastDto> Abilities { get; set; }
    public required IEnumerable<ItemCastDto> Items { get; set; }
    public required IEnumerable<HitCastDto> Hits { get; set; }
}

public record HitCastDto
{
    public required string TargetHeroKey { get; init; }
    public required int HitCount { get; init; }
}

public record ItemCastDto
{
    public required string ItemKey { get; init; }
    public required int TimesUsed { get; init; }
}

public record AbilityCastDto
{
    public required string AbilityKey { get; init; }
    public required int TimesUsed { get; init; }
    public Dictionary<int, int>? Targets { get; init; }
}
