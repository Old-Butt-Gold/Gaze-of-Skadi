using AutoMapper;
namespace GoS.Application.Features.Heroes.Queries.GetHeroBenchmark;
using GoS.Domain.Heroes.Models;

public class GetHeroBenchmarkMappingProfile : Profile
{
    public GetHeroBenchmarkMappingProfile()
    {
        CreateMap<BenchmarkValue, BenchmarkValueDto>();
        CreateMap<BenchmarkResult, BenchmarkResultDto>();
        CreateMap<Benchmark, BenchmarkDto>();
    }
}



