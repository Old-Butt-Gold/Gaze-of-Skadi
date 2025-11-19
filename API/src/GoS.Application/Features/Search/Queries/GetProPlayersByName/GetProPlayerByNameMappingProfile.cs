using AutoMapper;
using GoS.Domain.Search.Models;

namespace GoS.Application.Features.Search.Queries.GetProPlayersByName;

public sealed class GetProPlayerByNameMappingProfile : Profile
{
    public GetProPlayerByNameMappingProfile()
    {
        CreateMap<ProPlayer, ProPlayerDto>();
    }
}

