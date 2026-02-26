using AutoMapper;
using GoS.Domain.Matches.Models;

namespace GoS.Application.Features.Matches.Queries.GetMatchGeneralInformationById;

public class GetMatchGeneralInformationByIdMappingProfile : Profile
{
    public GetMatchGeneralInformationByIdMappingProfile()
    {
        CreateMap<MatchTeam, MatchTeamDto>();
        CreateMap<MatchPlayer, PlayerInfoDto>()
            .ForMember(dest => dest.HeroVariant, opt => opt.MapFrom(src => src.HeroVariant - 1));
    }
}
