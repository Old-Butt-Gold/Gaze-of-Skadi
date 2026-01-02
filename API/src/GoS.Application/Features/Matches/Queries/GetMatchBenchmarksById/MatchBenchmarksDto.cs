using GoS.Application.Dto;

namespace GoS.Application.Features.Matches.Queries.GetMatchBenchmarksById;

public record BenchmarkDataDto
{
    public required string Name { get; init; }
    
    public double? Raw { get; init; }
    
    public double? Percentage { get; init; }
}

public record PlayerBenchmarkDto
{
    public required PlayerInfoDto PlayerInfo { get; init; }
    
    public IEnumerable<BenchmarkDataDto> Benchmarks { get; init; } = [];
}

