using AutoMapper;
using GoS.Domain.Common.Models;

namespace GoS.Application.Features.Common.Queries.GetRecordsByField;

public class GetRecordsByFieldMappingProfile : Profile
{
    public GetRecordsByFieldMappingProfile()
    {
        CreateMap<Record, RecordDto>();
    }
}