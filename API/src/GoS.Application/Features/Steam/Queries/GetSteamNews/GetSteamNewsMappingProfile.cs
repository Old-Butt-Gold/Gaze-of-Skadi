using AutoMapper;
using GoS.Domain.Steam;

namespace GoS.Application.Features.Steam.Queries.GetSteamNews;

public class GetSteamNewsMappingProfile : Profile
{
    public GetSteamNewsMappingProfile()
    {
        CreateMap<NewsItem, SteamNewsDto>()
            .ForMember(dest => dest.Author, opt => opt.MapFrom(src => src.Author))
            .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
            .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
            .ForMember(dest => dest.Url, opt => opt.MapFrom(src => src.Url));
    }
}
