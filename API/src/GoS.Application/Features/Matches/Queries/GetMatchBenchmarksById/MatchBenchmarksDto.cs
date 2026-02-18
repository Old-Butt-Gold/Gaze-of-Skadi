namespace GoS.Application.Features.Matches.Queries.GetMatchBenchmarksById;

public record BenchmarkDataDto
{
    public required string Name { get; init; }

    public double? Raw { get; init; }

    public double? Percentage { get; init; }
}

public record PlayerBenchmarkDto
{
    public required int PlayerIndex { get; init; }

    public IEnumerable<BenchmarkDataDto> Benchmarks { get; init; } = [];
}

