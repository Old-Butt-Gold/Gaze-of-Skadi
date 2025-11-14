using AutoMapper;
using GoS.Domain.Common.Models;

namespace GoS.Application.Features.Common.Queries.GetDistributions;

public class GetDistributionsMappingProfile : Profile
{
    public GetDistributionsMappingProfile()
    {
        CreateMap<Distribution, DistributionDto>()
            .ForMember(dest => dest.Rows, opt => opt.MapFrom(src => src.Ranks.Rows))
            .ForMember(dest => dest.TotalCount, opt => opt.MapFrom(src => src.Ranks.Sum.Count));
        
        CreateMap<Row, RowDto>()
            .ForMember(dest => dest.Rank, opt => opt.MapFrom(src => src.BinName));
    }
}