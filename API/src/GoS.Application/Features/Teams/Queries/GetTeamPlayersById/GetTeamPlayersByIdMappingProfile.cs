using AutoMapper;
using GoS.Domain.Teams.Models;

namespace GoS.Application.Features.Teams.Queries.GetTeamPlayersById;

public class GetTeamPlayersByIdMappingProfile : Profile
{
    public GetTeamPlayersByIdMappingProfile()
    {
        CreateMap<TeamPlayer, TeamPlayerDto>();
    }
}

