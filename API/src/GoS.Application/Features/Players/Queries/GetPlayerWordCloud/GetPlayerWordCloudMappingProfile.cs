using AutoMapper;
using GoS.Domain.Players.Models;

namespace GoS.Application.Features.Players.Queries.GetPlayerWordCloud;

public class GetPlayerWordCloudMappingProfile : Profile
{
    public GetPlayerWordCloudMappingProfile()
    {
        CreateMap<PlayerWordCloud, PlayerWordCloudDto>();
    }
}

