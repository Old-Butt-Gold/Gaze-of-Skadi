using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroBenchmark;

internal sealed class GetHeroBenchmarkHandler(IRequester<OpenDotaHttpRequesterOptions> requester, IMapper mapper)
    : IRequestHandler<GetHeroBenchmarkQuery, BenchmarkDto?>
{
    public async Task<BenchmarkDto?> Handle(GetHeroBenchmarkQuery request, CancellationToken ct)
    {
        var parameters = new[]
        {
            new KeyValuePair<string, string>("hero_id", request.HeroId.ToString())
        };
        var benchmark = await requester.GetResponseAsync<Benchmark>("benchmarks", parameters, ct);
        return benchmark is null ? null : mapper.Map<BenchmarkDto>(benchmark);
    }
}
