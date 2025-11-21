using AutoMapper;
using GoS.Domain.Players.Models;

namespace GoS.Application.Features.Players.Queries.GetPlayerPros;

public class GetPlayerProsMappingProfile : Profile
{
    public GetPlayerProsMappingProfile()
    {
        CreateMap<PlayerPro, PlayerProDto>();
    }
}

