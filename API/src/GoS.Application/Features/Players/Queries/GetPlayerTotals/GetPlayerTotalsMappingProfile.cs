using AutoMapper;
using GoS.Domain.Players.Models;

namespace GoS.Application.Features.Players.Queries.GetPlayerTotals;

public class GetPlayerTotalsMappingProfile : Profile
{
    public GetPlayerTotalsMappingProfile()
    {
        CreateMap<PlayerTotal, PlayerTotalDto>();
    }
}

