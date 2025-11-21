using AutoMapper;
using GoS.Domain.Players.Models;

namespace GoS.Application.Features.Players.Queries.GetPlayerPeers;

public class GetPlayerPeersMappingProfile : Profile
{
    public GetPlayerPeersMappingProfile()
    {
        CreateMap<PlayerPeer, PlayerPeerDto>();
    }
}

