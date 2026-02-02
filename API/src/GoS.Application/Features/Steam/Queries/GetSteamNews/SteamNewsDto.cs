namespace GoS.Application.Features.Steam.Queries.GetSteamNews;

public record SteamNewsDto
{
    public required string Author { get; init; }

    public long Date { get; init; }

    public required string Title { get; init; }

    public required string Url { get; init; }
}
