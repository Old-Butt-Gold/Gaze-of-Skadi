using AutoMapper;
using GoS.Domain.Stratz;

namespace GoS.Application.Features.Stratz.GetHeroesMeta;

public class HeroesMetaMappingProfile : Profile
{
    public HeroesMetaMappingProfile()
    {
        CreateMap<HeroWinDay, HeroStatsDto>();
    }
}
