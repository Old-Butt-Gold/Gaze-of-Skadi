namespace GoS.Application.Features.Players.Queries.GetPlayerHeroes;

public class PlayerHeroDto
{
    public int HeroId { get; init; }

    public long LastPlayed { get; init; }

    public int Games { get; init; }

    public int Win { get; init; }

    public int WithGames { get; init; }

    public int WithWin { get; init; }

    public int AgainstGames { get; init; }

    public int AgainstWin { get; init; }
}

