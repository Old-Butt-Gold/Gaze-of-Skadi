using AutoMapper;
using GoS.Domain.Common.Models;

namespace GoS.Application.Features.Common.Queries.GetRecordsByField;

public class GetRecordsByFieldMappingProfile : Profile
{
    public GetRecordsByFieldMappingProfile()
    {
        // TODO make the same includes in the other files
        CreateMap<Record, RecordDto>()
            .ForMember(x => x.HeroInfo, opt => opt.Ignore());
    }
}