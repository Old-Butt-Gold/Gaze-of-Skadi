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
            .ForMember(x => x.AverageRank, opt => opt.MapFrom(src =>
                IsValidRank(src.AverageRank) ?
                    BaseEnumDto<Rank>.FromEnum((Rank)src.AverageRank!.Value) :
                    null))
            .ForMember(x => x.IsMatchParsed, opt => opt.MapFrom(src =>
                BaseEnumDto<BooleanState>.FromEnum(IsParsedMatch(src.Version))))
            .ForMember(x => x.IsRadiant, opt => opt.MapFrom(src =>
                BaseEnumDto<BooleanState>.FromEnum(IsInRadiantTeam(src.PlayerSlot))))
            .ForMember(x => x.HeroVariant, opt => opt.MapFrom(src =>
                src.HeroVariant - 1));
        CreateMap<PlayerMatchHero, PlayerMatchHeroDto>();
    }

    private static bool IsValidRank(int? rankValue)
    {
        if (!rankValue.HasValue) return false;
        var values = Enum.GetValues<Rank>();
        return values.Contains((Rank)rankValue.Value);
    }

    private static BooleanState IsParsedMatch(int? version)
        => version is > 0 ? BooleanState.True : BooleanState.False;

    private static BooleanState IsInRadiantTeam(int playerSlot) =>
        playerSlot switch
        {
            >= 128 or >= 5 and <= 9 => BooleanState.False,
            _ => BooleanState.True
        };
}
