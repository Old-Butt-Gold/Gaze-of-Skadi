using AutoMapper;
using GoS.Domain.Teams.Models;

namespace GoS.Application.Features.Teams.Queries.GetTeamById;

public class GetTeamByIdMappingProfile : Profile
{
    public GetTeamByIdMappingProfile()
    {
        CreateMap<Team, TeamByIdDto>();
    }
}

