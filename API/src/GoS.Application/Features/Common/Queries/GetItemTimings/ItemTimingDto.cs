namespace GoS.Application.Features.Common.Queries.GetItemTimings;

public class ItemTimingDto
{
    public int Wins { get; init; }
    public int Games { get; init; }
    public int Time { get; init; }
    public string Item { get; init; } = string.Empty;
    public int HeroId { get; init; }
}


