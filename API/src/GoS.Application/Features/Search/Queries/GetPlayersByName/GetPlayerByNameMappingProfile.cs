using AutoMapper;
using GoS.Domain.Search.Models;

namespace GoS.Application.Features.Search.Queries.GetPlayersByName;

public sealed class GetPlayerByNameMappingProfile : Profile
{
    public GetPlayerByNameMappingProfile()
    {
        CreateMap<PlayerResponse, PlayerResponseDto>();
    }
}