namespace GoS.Application.Features.Teams.Queries.GetTeams;

public class TeamDto
{
    public string? Tag { get; init; }
    public string? Name { get; init; }
    public long LastMatchTime { get; init; }
    public int Losses { get; init; }
    public int Wins { get; init; }
    public double Rating { get; init; }
    public int TeamId { get; init; }
}


