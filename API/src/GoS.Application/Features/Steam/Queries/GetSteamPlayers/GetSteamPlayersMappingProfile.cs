using AutoMapper;
using GoS.Domain.Steam;

namespace GoS.Application.Features.Steam.Queries.GetSteamPlayers;

public class GetSteamPlayersMappingProfile : Profile
{
    public GetSteamPlayersMappingProfile()
    {
        CreateMap<SteamPlayer, SteamPlayerDto>()
            .ForMember(dest => dest.SteamId32,
                opt => opt.MapFrom(src => src.SteamId ?? string.Empty))
            .ForMember(dest => dest.SteamName,
                opt => opt.MapFrom(src => src.SteamName ?? string.Empty))
            .ForMember(dest => dest.Avatar,
                opt => opt.MapFrom(src => src.Avatar ?? string.Empty));
    }
}
