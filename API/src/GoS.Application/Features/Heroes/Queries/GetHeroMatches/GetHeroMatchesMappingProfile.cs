using AutoMapper;
using GoS.Domain.Heroes.Models;

namespace GoS.Application.Features.Heroes.Queries.GetHeroMatches;

public class GetHeroMatchesMappingProfile : Profile
{
    public GetHeroMatchesMappingProfile()
    {
        CreateMap<HeroMatch, HeroMatchDto>();
    }
}

