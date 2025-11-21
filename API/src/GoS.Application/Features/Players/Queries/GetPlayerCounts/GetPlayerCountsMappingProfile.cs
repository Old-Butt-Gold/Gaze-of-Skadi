using AutoMapper;
using GoS.Domain.Players.Models;

namespace GoS.Application.Features.Players.Queries.GetPlayerCounts;

public class GetPlayerCountsMappingProfile : Profile
{
    public GetPlayerCountsMappingProfile()
    {
        CreateMap<PlayerCount, PlayerCountDto>();
    }
}

