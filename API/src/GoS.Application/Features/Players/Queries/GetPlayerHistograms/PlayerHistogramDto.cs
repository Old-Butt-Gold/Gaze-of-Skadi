namespace GoS.Application.Features.Players.Queries.GetPlayerHistograms;

public class PlayerHistogramDto
{
    public long? X { get; init; }

    public int Games { get; init; }

    public int Win { get; init; }
}