using AutoMapper;
using GoS.Domain.Common.Models;

namespace GoS.Application.Features.Common.Queries.GetLeagues;

public class GetLeaguesMappingProfile : Profile
{
    public GetLeaguesMappingProfile()
    {
        CreateMap<League, LeagueDto>();
    }
}

