using AutoMapper;
using GoS.Application.Dto;
using GoS.Domain.BaseEnums;
using GoS.Domain.Extensions;
using GoS.Domain.Players.Enums;
using GoS.Domain.Players.Models;

namespace GoS.Application.Features.Players.Queries.GetPlayerRecord;

public class GetPlayerRecordMappingProfile : Profile
{
    private static readonly Dictionary<string, PlayerFieldHistogram> FieldMapping;

    static GetPlayerRecordMappingProfile()
    {
        FieldMapping = [];

        var enumValues = Enum.GetValues<PlayerFieldHistogram>();

        foreach (var enumValue in enumValues)
        {
            FieldMapping[enumValue.ToSnakeCase()] = enumValue;
        }
    }

    public GetPlayerRecordMappingProfile()
    {
        CreateMap<PlayerRecord, PlayerRecordDto>()
            .ForMember(x => x.IsRadiant, opt => opt.MapFrom(src =>
                BaseEnumDto<BooleanState>.FromEnum(IsInRadiantTeam(src.PlayerSlot))))
            .ForMember(x => x.RecordFields, opt => opt.MapFrom(MapRecordFields));
    }

    private static Dictionary<PlayerFieldHistogram, object>? MapRecordFields(PlayerRecord source, PlayerRecordDto _)
    {
        var result = new Dictionary<PlayerFieldHistogram, object>();

        if (source.RecordFields is null)
        {
            return null;
        }

        foreach (var field in source.RecordFields)
        {
            if (FieldMapping.TryGetValue(field.Key, out var recordValue))
            {
                result[recordValue] = field.Value;
            }
        }

        return result;
    }

    private static BooleanState IsInRadiantTeam(int playerSlot) =>
        playerSlot switch
        {
            >= 128 or >= 5 and <= 9 => BooleanState.False,
            _ => BooleanState.True
        };
}
