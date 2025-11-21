using AutoMapper;
using GoS.Domain.Players.Models;

namespace GoS.Application.Features.Players.Queries.GetPlayerHeroRankings;

public class GetPlayerHeroRankingsMappingProfile : Profile
{
    public GetPlayerHeroRankingsMappingProfile()
    {
        CreateMap<PlayerHeroRanking, PlayerHeroRankingDto>();
    }
}

