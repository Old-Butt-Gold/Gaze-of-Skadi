namespace GoS.Application.Features.Heroes.Queries.GetHeroItemPopularity;

public class HeroItemPopularityDto
{
    public Dictionary<string, int> StartGameItems { get; set; } = new();
    public Dictionary<string, int> EarlyGameItems { get; set; } = new();
    public Dictionary<string, int> MidGameItems { get; set; } = new();
    public Dictionary<string, int> LateGameItems { get; set; } = new();
}

