using AutoMapper;
using GoS.Application.Dto;
using GoS.Domain.BaseEnums;
using GoS.Domain.Players.Models;

namespace GoS.Application.Features.Players.Queries.GetPlayerMatches;

public class GetPlayerMatchesMappingProfile : Profile
{
    public GetPlayerMatchesMappingProfile()
    {
        CreateMap<PlayerMatch, PlayerMatchDto>()
            .ForMember(x => x.IsRadiant, opt => opt.MapFrom(src =>
                BaseEnumDto<BooleanState>.FromEnum(IsInRadiantTeam(src.PlayerSlot))));
        CreateMap<PlayerMatchHero, PlayerMatchHeroDto>();
    }

    private static BooleanState IsInRadiantTeam(int playerSlot) =>
        playerSlot switch
        {
            >= 128 or >= 5 and <= 9 => BooleanState.False,
            _ => BooleanState.True
        };
}
