using AutoMapper;
using GoS.Domain.Teams.Models;

namespace GoS.Application.Features.Teams.Queries.GetTeamPlayersById;

public class GetTeamPlayersByIdMappingProfile : Profile
{
    public GetTeamPlayersByIdMappingProfile()
    {
        CreateMap<TeamPlayer, TeamPlayerDto>()
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src =>
                $"https://cdn.stratz.com/images/dota2/players/{src.AccountId}.png"));
    }
}

