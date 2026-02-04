namespace GoS.Application.Features.Stratz.GetHeroesMeta;

public sealed class HeroesMetaDto
{
    public required IEnumerable<HeroStatsDto> HeroesPos1 { get; set; }
    public required IEnumerable<HeroStatsDto> HeroesPos2 { get; set; }
    public required IEnumerable<HeroStatsDto> HeroesPos3 { get; set; }
    public required IEnumerable<HeroStatsDto> HeroesPos4 { get; set; }
    public required IEnumerable<HeroStatsDto> HeroesPos5 { get; set; }
}

public sealed class HeroStatsDto
{
    public int HeroId { get; set; }
    public int MatchCount { get; set; }
    public int WinCount { get; set; }
    public double WinRate => MatchCount > 0 ? Math.Round((double)WinCount / MatchCount * 100, 2) : 0;
}
