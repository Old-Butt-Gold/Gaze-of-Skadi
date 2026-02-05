namespace GoS.Application.Features.Stratz.GetHeroesMetaChange;

public sealed class HeroMetaTimelineDto
{
    public List<HeroMetaPointDto> Pos1 { get; set; } = [];
    public List<HeroMetaPointDto> Pos2 { get; set; } = [];
    public List<HeroMetaPointDto> Pos3 { get; set; } = [];
    public List<HeroMetaPointDto> Pos4 { get; set; } = [];
    public List<HeroMetaPointDto> Pos5 { get; set; } = [];
}

public sealed class HeroMetaPointDto
{
    public double WinRate { get; set; }
    public double WinRateChanged { get; set; }
    public long TimeStamp { get; set; }
    public int MatchCount { get; set; }
}
