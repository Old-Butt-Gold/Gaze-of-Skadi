using GoS.Application.Abstractions;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroBenchmark;

internal sealed class GetHeroBenchmarkHandler(IRequester requester)
    : IRequestHandler<GetHeroBenchmarkQuery, Benchmark?>
{
    public Task<Benchmark?> Handle(GetHeroBenchmarkQuery request, CancellationToken ct)
    {
        var parameters = new[]
        {
            new KeyValuePair<string, string>("hero_id", request.HeroId.ToString())
        };
        return requester.GetResponseAsync<Benchmark>("benchmarks", parameters, ct);
    }
}