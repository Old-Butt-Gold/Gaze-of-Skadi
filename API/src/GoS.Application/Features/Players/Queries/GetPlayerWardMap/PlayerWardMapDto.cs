namespace GoS.Application.Features.Players.Queries.GetPlayerWardMap;

public class PlayerWardMapDto
{
    public Dictionary<string, Dictionary<string, long>> Obs { get; init; } = [];

    public Dictionary<string, Dictionary<string, long>> Sen { get; init; } = [];
}

