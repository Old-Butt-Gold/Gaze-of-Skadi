using AutoMapper;
using GoS.Application.Dto;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Domain.Matches.Enums;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchBenchmarksById;

internal sealed class GetMatchBenchmarksByIdHandler(ISender sender, IMapper mapper)
    : IRequestHandler<GetMatchBenchmarksByIdQuery, MatchBenchmarksDto?>
{
    public async Task<MatchBenchmarksDto?> Handle(GetMatchBenchmarksByIdQuery request, CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);

        if (match is null)
        {
            return null;
        }
        
        var playerBenchmarks = new List<PlayerBenchmarkDto>();

        foreach (var player in match.Players)
        {
            var benchmarks = ExtractBenchmarks(player.Benchmarks);
            playerBenchmarks.Add(new PlayerBenchmarkDto
            {
                PlayerInfo = mapper.Map<PlayerInfoDto>(player),
                Benchmarks = benchmarks
            });
        }

        return new MatchBenchmarksDto
        {
            Players = playerBenchmarks
        };
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