using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Domain.Matches.Enums;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchBenchmarksById;

internal sealed class GetMatchBenchmarksByIdHandler(ISender sender)
    : IRequestHandler<GetMatchBenchmarksByIdQuery, IEnumerable<PlayerBenchmarkDto>?>
{
    public async Task<IEnumerable<PlayerBenchmarkDto>?> Handle(GetMatchBenchmarksByIdQuery request, CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);

        if (match is null)
        {
            return null;
        }

        // TODO on old matches return dire team first (matchId: 3077089495)
        return match.Players.Select(player => ExtractBenchmarks(player.Benchmarks))
            .Select((benchmarks, index) =>
                new PlayerBenchmarkDto
                {
                    PlayerIndex = index,
                    Benchmarks = benchmarks
                })
            .ToList();
    }

    private static List<BenchmarkDataDto> ExtractBenchmarks(MatchPlayerBenchmarks benchmarks)
    {
        var benchmarkEntries = new (string Name, IDictionary<MatchPlayerBenchmarkEnum, double?>? Data)[]
        {
            (nameof(benchmarks.GoldPerMin), benchmarks.GoldPerMin),
            (nameof(benchmarks.HeroDamagePerMin), benchmarks.HeroDamagePerMin),
            (nameof(benchmarks.HeroHealingPerMin), benchmarks.HeroHealingPerMin),
            (nameof(benchmarks.KillsPerMin), benchmarks.KillsPerMin),
            (nameof(benchmarks.LastHitsPerMin), benchmarks.LastHitsPerMin),
            (nameof(benchmarks.TowerDamage), benchmarks.TowerDamage),
            (nameof(benchmarks.XpPerMin), benchmarks.XpPerMin),
        };

        var result = new List<BenchmarkDataDto>();

        foreach (var (name, data) in benchmarkEntries)
        {
            var rawValue = data != null && data.TryGetValue(MatchPlayerBenchmarkEnum.Raw, out var raw) ? raw : null;
            var pctValue = data != null && data.TryGetValue(MatchPlayerBenchmarkEnum.Percentage, out var pct) ? pct : null;

            result.Add(new BenchmarkDataDto
            {
                Name = name,
                Raw = rawValue,
                Percentage = pctValue
            });
        }

        return result;
    }
}
