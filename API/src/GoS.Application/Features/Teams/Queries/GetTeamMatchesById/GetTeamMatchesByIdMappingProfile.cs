using AutoMapper;
using GoS.Domain.Teams.Models;

namespace GoS.Application.Features.Teams.Queries.GetTeamMatchesById;

public class GetTeamMatchesByIdMappingProfile : Profile
{
    public GetTeamMatchesByIdMappingProfile()
    {
        CreateMap<TeamMatch, TeamMatchDto>()
            .ForMember(dest => dest.LeagueImageUrl, opt => opt.MapFrom(src =>
            $"https://cdn.stratz.com/images/dota2/leagues/{src.LeagueId}.png"));
    }
}

