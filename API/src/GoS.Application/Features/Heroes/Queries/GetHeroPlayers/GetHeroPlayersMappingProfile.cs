using AutoMapper;
using GoS.Domain.Heroes.Models;

namespace GoS.Application.Features.Heroes.Queries.GetHeroPlayers;

public class GetHeroPlayersMappingProfile : Profile
{
    public GetHeroPlayersMappingProfile()
    {
        CreateMap<HeroPlayer, HeroPlayerDto>();
    }
}

