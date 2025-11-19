using AutoMapper;
using GoS.Domain.Teams.Models;

namespace GoS.Application.Features.Teams.Queries.GetTeams;

public class GetTeamsMappingProfile : Profile
{
    public GetTeamsMappingProfile()
    {
        CreateMap<Team, TeamDto>();
    }
}

