namespace GoS.Application.Features.Players.Queries.GetPlayerWordCloud;

public class PlayerWordCloudDto
{
    public Dictionary<string, long> WriteWordCount { get; init; } = [];

    public Dictionary<string, long> ReadWordCounts { get; init; } = [];
}

