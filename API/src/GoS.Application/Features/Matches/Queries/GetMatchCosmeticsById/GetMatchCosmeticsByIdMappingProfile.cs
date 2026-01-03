using AutoMapper;
using GoS.Domain.Matches.Models;

namespace GoS.Application.Features.Matches.Queries.GetMatchCosmeticsById;

public class GetMatchCosmeticsByIdMappingProfile : Profile
{
    public GetMatchCosmeticsByIdMappingProfile()
    {
        CreateMap<Cosmetic, CosmeticDto>()
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => 
                $"https://cdn.cloudflare.steamstatic.com/apps/570/{src.ImagePath.TrimStart('/')}"))
            .ForMember(dest => dest.MarketUrl, opt => opt.MapFrom(src => 
                $"https://steamcommunity.com/market/listings/570/{Uri.EscapeDataString(src.Name)}"));
    }
}