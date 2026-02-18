using AutoMapper;
using GoS.Domain.Matches.Models;

namespace GoS.Application.Features.Matches.Queries.GetMatchPlayersById;

public class GetMatchPlayerByIdMappingProfile : Profile
{
    public GetMatchPlayerByIdMappingProfile()
    {
        CreateMap<MatchPlayer, PlayerInfoDto>()
            .ForMember(dest => dest.HeroVariant, opt => opt.MapFrom(src => src.HeroVariant - 1));
    }
}
