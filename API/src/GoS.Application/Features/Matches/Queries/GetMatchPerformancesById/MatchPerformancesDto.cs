namespace GoS.Application.Features.Matches.Queries.GetMatchPerformancesById;

public record PerformanceDataDto
{
    public string? MultiKills { get; set; }
    public string? KillStreaks { get; set; }
    public double? StunsDuration { get; set; }
    public int? Stacks { get; set; }
    public int Dead { get; set; }
    public int Buybacks { get; set; }
    public int? Pings { get; set; }
    public string? MaxHeroHitAbilityName { get; set; } // if null then its auto-attack, may be item or ability key from .json
    public int MaxHeroHitHeroId { get; set; }
    public long MaxHeroHitValue { get; set; }
    public Dictionary<string, int>? PerfomanceOthers { get; set; }
}

public record PlayerPerformanceDto
{
    public required int PlayerIndex { get; init; }

    public required PerformanceDataDto Performance { get; init; }
}
