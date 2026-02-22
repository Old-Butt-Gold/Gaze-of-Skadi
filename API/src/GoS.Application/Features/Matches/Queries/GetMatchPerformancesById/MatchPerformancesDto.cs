namespace GoS.Application.Features.Matches.Queries.GetMatchPerformancesById;

public class MaxHeroHitDto
{
    public required string MaxHeroHitAbilityOrItemName { get; set; }
    public int MaxHeroHitHeroId { get; set; }
    public long MaxHeroHitValue { get; set; }
}

public record PerformanceDataDto
{
    public int? MultiKills { get; set; }
    public int? KillStreaks { get; set; }
    public double? StunsDuration { get; set; }
    public int? Stacks { get; set; }
    public int? DeadTime { get; set; }
    public int? PurchasedTpscroll { get; set; }
    public int? Buybacks { get; set; }
    public int? Pings { get; set; }
    public MaxHeroHitDto? MaxHeroHit { get; set; }
}

public record PlayerPerformanceDto
{
    public required int PlayerIndex { get; init; }

    public required PerformanceDataDto Performance { get; init; }
}
