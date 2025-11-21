using AutoMapper;
using GoS.Domain.Players.Models;

namespace GoS.Application.Features.Players.Queries.GetPlayerById;

public class GetPlayerByIdMappingProfile : Profile
{
    public GetPlayerByIdMappingProfile()
    {
        CreateMap<Player, PlayerDto>();
        CreateMap<ProfileInfo, ProfileInfoDto>();
    }
}
