using AutoMapper;
using GoS.Domain.Players.Models;

namespace GoS.Application.Features.Players.Queries.GetPlayerHeroes;

public class GetPlayerHeroesMappingProfile : Profile
{
    public GetPlayerHeroesMappingProfile()
    {
        CreateMap<PlayerHero, PlayerHeroDto>();
    }
}

