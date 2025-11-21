using AutoMapper;
using GoS.Domain.Matches.Models;

namespace GoS.Application.Features.Matches.Queries.GetProMatches;

public class GetProMatchesMappingProfile : Profile
{
    public GetProMatchesMappingProfile()
    {
        CreateMap<ProMatch, ProMatchDto>();
    }
}

