using AutoMapper;
using GoS.Domain.Players.Models;

namespace GoS.Application.Features.Players.Queries.GetPlayerWinLossById;

public class GetPlayerWinLossByIdMappingProfile : Profile
{
    public GetPlayerWinLossByIdMappingProfile()
    {
        CreateMap<PlayerWinLoss, PlayerWinLossDto>();
    }
}