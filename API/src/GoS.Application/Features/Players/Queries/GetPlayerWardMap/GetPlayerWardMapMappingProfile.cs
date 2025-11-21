using AutoMapper;
using GoS.Domain.Players.Models;

namespace GoS.Application.Features.Players.Queries.GetPlayerWardMap;

public class GetPlayerWardMapMappingProfile : Profile
{
    public GetPlayerWardMapMappingProfile()
    {
        CreateMap<PlayerWardMap, PlayerWardMapDto>();
    }
}

