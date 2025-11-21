using AutoMapper;
using GoS.Domain.Players.Models;

namespace GoS.Application.Features.Players.Queries.GetPlayerHistograms;

public class GetPlayerHistogramsMappingProfile : Profile
{
    public GetPlayerHistogramsMappingProfile()
    {
        CreateMap<PlayerHistogram, PlayerHistogramDto>();
    }
}

