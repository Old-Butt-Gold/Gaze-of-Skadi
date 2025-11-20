using AutoMapper;
using GoS.Domain.Heroes.Models;

namespace GoS.Application.Features.Heroes.Queries.GetHeroDurations;

public class GetHeroDurationsMappingProfile : Profile
{
    public GetHeroDurationsMappingProfile()
    {
        CreateMap<HeroDuration, HeroDurationDto>();
    }
}

