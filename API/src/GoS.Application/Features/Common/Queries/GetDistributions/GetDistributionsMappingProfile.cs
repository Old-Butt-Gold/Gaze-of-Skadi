using AutoMapper;
using GoS.Domain.Common.Models;

namespace GoS.Application.Features.Common.Queries.GetDistributions;

public class GetDistributionsMappingProfile : Profile
{
    public GetDistributionsMappingProfile()
    {
        CreateMap<Distribution, DistributionDto>()
            .ForMember(dest => dest.Rows, opt => opt.MapFrom(src => src.Ranks.Rows))
            .ForMember(dest => dest.TotalCount, opt => opt.MapFrom(src => src.Ranks.Sum.Count))
            .AfterMap((_, dest) =>
            {
                foreach (var row in dest.Rows)
                {
                    row.Percentage = Math.Round(100 * (double)row.CumulativeSum / dest.TotalCount, 2);
                }
            });

        CreateMap<Row, RowDto>()
            .ForMember(dest => dest.Rank, opt => opt.MapFrom(src => src.BinName))
            .ForMember(dest => dest.Percentage, opt => opt.Ignore());
    }
}
