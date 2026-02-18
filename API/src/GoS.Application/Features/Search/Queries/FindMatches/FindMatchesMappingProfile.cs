using AutoMapper;
using GoS.Domain.Matches.Models;

namespace GoS.Application.Features.Search.Queries.FindMatches;

public class FindMatchesMappingProfile : Profile
{
    public FindMatchesMappingProfile()
    {
        CreateMap<MatchFind, MatchFindDto>();
    }
}

