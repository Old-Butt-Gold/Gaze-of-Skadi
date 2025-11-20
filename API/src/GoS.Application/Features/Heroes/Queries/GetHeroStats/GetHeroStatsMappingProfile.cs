using AutoMapper;
using GoS.Domain.Heroes.Models;

namespace GoS.Application.Features.Heroes.Queries.GetHeroStats;

public class GetHeroStatsMappingProfile : Profile
{
    public GetHeroStatsMappingProfile()
    {
        CreateMap<HeroStats, HeroStatsDto>();
    }
}

