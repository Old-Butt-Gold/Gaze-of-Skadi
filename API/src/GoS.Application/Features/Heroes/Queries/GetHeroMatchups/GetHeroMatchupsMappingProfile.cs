using AutoMapper;
using GoS.Domain.Heroes.Models;

namespace GoS.Application.Features.Heroes.Queries.GetHeroMatchups;

public class GetHeroMatchupsMappingProfile : Profile
{
    public GetHeroMatchupsMappingProfile()
    {
        CreateMap<HeroMatchup, HeroMatchupDto>();
    }
}

