using AutoMapper;
using GoS.Domain.Matches.Models;

namespace GoS.Application.Features.Matches.Queries.FindMatches;

public class FindMatchesMappingProfile : Profile
{
    public FindMatchesMappingProfile()
    {
        CreateMap<MatchFind, MatchFindDto>();
    }
}

