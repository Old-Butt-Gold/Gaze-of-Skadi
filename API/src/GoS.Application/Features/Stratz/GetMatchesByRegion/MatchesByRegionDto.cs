namespace GoS.Application.Features.Stratz.GetMatchesByRegion;

public sealed class MatchesByRegionDto
{
    public IEnumerable<RegionStatsDto> China { get; set; } = [];
    public IEnumerable<RegionStatsDto> Sea { get; set; } = [];
    public IEnumerable<RegionStatsDto> NorthAmerica { get; set; } = [];
    public IEnumerable<RegionStatsDto> SouthAmerica { get; set; } = [];
    public IEnumerable<RegionStatsDto> Europe { get; set; } = [];
}

public sealed class RegionStatsDto
{
    public long MonthUnix { get; set; }
    public int MatchCount { get; set; }
}
