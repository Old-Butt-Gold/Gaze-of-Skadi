using AutoMapper;
using GoS.Domain.Matches.Models;

namespace GoS.Application.Features.Matches.Queries.GetMatchOverviewById;

public class GetMatchOverviewByIdMapperProfile : Profile
{
    public GetMatchOverviewByIdMapperProfile()
    {
        CreateMap<PermanentBuff, PermanentBuffDto>();
    }
}
