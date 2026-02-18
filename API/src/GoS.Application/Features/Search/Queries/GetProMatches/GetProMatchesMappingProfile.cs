using AutoMapper;
using GoS.Domain.Matches.Models;

namespace GoS.Application.Features.Search.Queries.GetProMatches;

public class GetProMatchesMappingProfile : Profile
{
    public GetProMatchesMappingProfile()
    {
        CreateMap<ProMatch, ProMatchDto>()
            .ForMember(dest => dest.LeagueImageUrl, opt => opt.MapFrom(src =>
                $"https://cdn.stratz.com/images/dota2/leagues/{src.LeagueId}.png"))
            .ForMember(dest => dest.RadiantImage, opt => opt.MapFrom(src =>
                $"https://cdn.stratz.com/images/dota2/teams/{src.RadiantTeamId ?? 0}.png"))
            .ForMember(dest => dest.DireImage, opt => opt.MapFrom(src =>
                $"https://cdn.stratz.com/images/dota2/teams/{src.DireTeamId ?? 0}.png"));
    }
}

