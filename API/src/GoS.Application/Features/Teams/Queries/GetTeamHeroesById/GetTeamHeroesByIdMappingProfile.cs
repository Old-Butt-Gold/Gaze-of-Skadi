using AutoMapper;
using GoS.Domain.Teams.Models;

namespace GoS.Application.Features.Teams.Queries.GetTeamHeroesById;

public class GetTeamHeroesByIdMappingProfile : Profile
{
    public GetTeamHeroesByIdMappingProfile()
    {
        CreateMap<TeamHero, TeamHeroDto>();
    }
}

