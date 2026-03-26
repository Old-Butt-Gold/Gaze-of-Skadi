using GoS.Application.Dto;
using GoS.Domain.BaseEnums;

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

    public Uri? Avatar { get; init; }

    public BaseEnumDto<Rank>? RankTier { get; init; }
}

