using AutoMapper;
using GoS.Domain.Heroes.Models;

namespace GoS.Application.Features.Heroes.Queries.GetHeroItemPopularity;

public class GetHeroItemPopularityMappingProfile : Profile
{
    public GetHeroItemPopularityMappingProfile()
    {
        CreateMap<HeroItemPopularity, HeroItemPopularityDto>();
    }
}

