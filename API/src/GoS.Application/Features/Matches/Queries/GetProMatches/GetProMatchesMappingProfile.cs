using AutoMapper;
using GoS.Domain.Matches.Models;

namespace GoS.Application.Features.Matches.Queries.GetProMatches;

public class GetProMatchesMappingProfile : Profile
{
    public GetProMatchesMappingProfile()
    {
        CreateMap<ProMatch, ProMatchDto>()
            .ForMember(dest => dest.LeagueImageUrl, opt => opt.MapFrom(src =>
                $"https://cdn.stratz.com/images/dota2/leagues/{src.LeagueId}.png"));
    }
}

