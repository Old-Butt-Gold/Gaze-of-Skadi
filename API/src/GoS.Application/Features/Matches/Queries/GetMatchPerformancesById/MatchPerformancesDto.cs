using GoS.Application.Dto;

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
    public string? MaxHeroHitAbilityName { get; set; } // if null then its auto-attack
    public int MaxHeroHitHeroId { get; set; }
    public long MaxHeroHitValue { get; set; }
}

public record PlayerPerformanceDto
{
    public required PlayerInfoDto PlayerInfo { get; init; }
    
    public required PerformanceDataDto Performance { get; init; }
}