using AutoMapper;
using GoS.Domain.Teams.Models;

namespace GoS.Application.Features.Teams.Queries.GetTeamMatchesById;

public class GetTeamMatchesByIdMappingProfile : Profile
{
    public GetTeamMatchesByIdMappingProfile()
    {
        CreateMap<TeamMatch, TeamMatchDto>();
    }
}

