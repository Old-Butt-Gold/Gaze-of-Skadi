namespace GoS.Application.Features.Teams.Queries.GetTeamById;

public class TeamByIdDto
{
    public required string Tag { get; init; }
    public required string Name { get; init; }
    public long LastMatchTime { get; init; }
    public int Losses { get; init; }
    public int Wins { get; init; }
    public double Rating { get; init; }
    public int TeamId { get; init; }
    public Uri? LogoUrl { get; init; }
}
