using AutoMapper;
using GoS.Domain.Common.Models;

namespace GoS.Application.Features.Common.Queries.GetItemTimings;

public class GetItemTimingsMappingProfile : Profile
{
    public GetItemTimingsMappingProfile()
    {
        CreateMap<ItemTiming, ItemTimingDto>();
    }
}

