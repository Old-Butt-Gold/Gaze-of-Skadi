namespace GoS.Application.Features.Heroes.Queries.GetHeroRanking;

public class HeroRankingDto
{
    public long HeroId { get; set; }
    public List<RankingPlayerDto> Rankings { get; set; } = [];
}

public class RankingPlayerDto
{
    public long AccountId { get; init; }

    public double Score { get; init; }

    public string PersonaName { get; init; } = string.Empty;

    public string Name { get; init; } = string.Empty;

    public Uri? Avatar { get; init; }

    public long? LastLogin { get; init; }

    public int RankTier { get; init; }
}

