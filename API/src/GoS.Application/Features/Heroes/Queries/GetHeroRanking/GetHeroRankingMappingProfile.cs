using AutoMapper;
using GoS.Domain.Heroes.Models;

namespace GoS.Application.Features.Heroes.Queries.GetHeroRanking;

public class GetHeroRankingMappingProfile : Profile
{
    public GetHeroRankingMappingProfile()
    {
        CreateMap<HeroRanking, HeroRankingDto>();
        CreateMap<RankingPlayer, RankingPlayerDto>();
    }
}

