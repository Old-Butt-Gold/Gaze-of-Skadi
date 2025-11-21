using AutoMapper;
using GoS.Domain.Matches.Models;

namespace GoS.Application.Features.Matches.Queries.GetPublicMatches;

public class GetPublicMatchesMappingProfile : Profile
{
    public GetPublicMatchesMappingProfile()
    {
        CreateMap<PublicMatch, PublicMatchDto>();
    }
}

