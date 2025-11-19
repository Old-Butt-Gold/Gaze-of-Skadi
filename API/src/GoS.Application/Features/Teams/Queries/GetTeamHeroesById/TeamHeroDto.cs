namespace GoS.Application.Features.Teams.Queries.GetTeamHeroesById;

public class TeamHeroDto
{
    public int HeroId { get; init; }
    public string? LocalizedName { get; init; }
    public int GamesPlayed { get; init; }
    public int Wins { get; init; }
}

