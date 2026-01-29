using AutoMapper;
using GoS.Domain.Common.Models;

namespace GoS.Application.Features.Common.Queries.GetLeagues;

public class GetLeaguesMappingProfile : Profile
{
    public GetLeaguesMappingProfile()
    {
        CreateMap<League, LeagueDto>()
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src =>
                $"https://cdn.stratz.com/images/dota2/leagues/{src.LeagueId}.png"));
    }
}

