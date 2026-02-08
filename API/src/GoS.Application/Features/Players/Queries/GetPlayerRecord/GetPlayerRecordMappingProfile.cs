using AutoMapper;
using GoS.Application.Dto;
using GoS.Domain.BaseEnums;
using GoS.Domain.Players.Models;

namespace GoS.Application.Features.Players.Queries.GetPlayerRecord;

public class GetPlayerRecordMappingProfile : Profile
{
    public GetPlayerRecordMappingProfile()
    {
        CreateMap<PlayerRecord, PlayerRecordDto>()
            .ForMember(x => x.IsRadiant, opt => opt.MapFrom(src =>
                BaseEnumDto<BooleanState>.FromEnum(IsInRadiantTeam(src.PlayerSlot))))
            .ForMember(x => x.HeroVariant, opt => opt.MapFrom(src =>
                src.HeroVariant - 1))
            .ForMember(x => x.RecordField, opt => opt.Ignore());
    }

    private static BooleanState IsInRadiantTeam(int playerSlot) =>
        playerSlot switch
        {
            >= 128 or >= 5 and <= 9 => BooleanState.False,
            _ => BooleanState.True
        };
}
