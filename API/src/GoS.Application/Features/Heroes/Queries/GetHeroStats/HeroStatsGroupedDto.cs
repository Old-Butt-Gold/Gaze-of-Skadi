namespace GoS.Application.Features.Heroes.Queries.GetHeroStats;

public class HeroStatsGroupedDto
{
    public int Id { get; init; }
    public TurboStatsDto Turbo { get; init; } = null!;
    public ProStatsDto Pro { get; init; } = null!;
    public RankedStatsDto Ranked { get; init; } = null!;
}

public class BaseStatsDto
{
    public int Pick { get; init; }
    public int Win { get; init; }
}

public class TurboStatsDto : BaseStatsDto;

public class ProStatsDto : BaseStatsDto
{
    public int Ban { get; init; }
}

public class RankedStatsDto
{
    public RankTierStatsDto Herald { get; init; } = null!;
    public RankTierStatsDto Guardian { get; init; } = null!;
    public RankTierStatsDto Crusader { get; init; } = null!;
    public RankTierStatsDto Archon { get; init; } = null!;
    public RankTierStatsDto Legend { get; init; } = null!;
    public RankTierStatsDto Ancient { get; init; } = null!;
    public RankTierStatsDto Divine { get; init; } = null!;
    public RankTierStatsDto Pub { get; init; } = null!;
}

public class RankTierStatsDto : BaseStatsDto;
