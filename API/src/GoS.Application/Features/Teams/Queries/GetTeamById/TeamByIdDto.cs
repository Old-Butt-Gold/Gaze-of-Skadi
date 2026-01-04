namespace GoS.Application.Features.Teams.Queries.GetTeamById;

public class TeamByIdDto
{
    public int TeamId { get; init; }
    public double Rating { get; init; }
    public int Wins { get; init; }
    public int Losses { get; init; }
    public long LastMatchTime { get; init; }
    public string? Name { get; init; }
    public string? Tag { get; init; }
    public Uri? LogoUrl { get; init; }
}

