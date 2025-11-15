using AutoMapper;
using GoS.Domain.Common.Models;
using GoS.Domain.Resources.Models.Heroes;

namespace GoS.Application.Features.Common.Queries.GetRecordsByField;

public class GetRecordsByFieldMappingProfile : Profile
{
    public GetRecordsByFieldMappingProfile()
    {
        CreateMap<Record, RecordDto>()
            .ForMember(x => x.HeroInfo, opt => opt.Ignore());

        CreateMap<HeroInfo, HeroInfoDto>();
    }
}