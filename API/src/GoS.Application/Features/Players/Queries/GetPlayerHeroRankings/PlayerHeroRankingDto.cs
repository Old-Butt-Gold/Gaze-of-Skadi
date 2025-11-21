namespace GoS.Application.Features.Players.Queries.GetPlayerHeroRankings;

public class PlayerHeroRankingDto
{
    public long HeroId { get; init; }

    public double Score { get; init; }

    public double PercentRank { get; init; }
}

