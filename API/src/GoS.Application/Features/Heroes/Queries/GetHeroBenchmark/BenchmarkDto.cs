namespace GoS.Application.Features.Heroes.Queries.GetHeroBenchmark;

public class BenchmarkDto
{
    public long HeroId { get; set; }
    public BenchmarkResultDto Result { get; set; } = new();
}

public class BenchmarkResultDto
{
    public IEnumerable<BenchmarkValueDto> GoldPerMinutes { get; set; } = [];
    public IEnumerable<BenchmarkValueDto> XpPerMinutes { get; set; } = [];
    public IEnumerable<BenchmarkValueDto> KillsPerMinutes { get; set; } = [];
    public IEnumerable<BenchmarkValueDto> LastHitPerMinutes { get; set; } = [];
    public IEnumerable<BenchmarkValueDto> HeroDamagePerMinutes { get; set; } = [];
    public IEnumerable<BenchmarkValueDto> HeroHealingPerMinutes { get; set; } = [];
    public IEnumerable<BenchmarkValueDto> TowerDamage { get; set; } = [];
}

public class BenchmarkValueDto
{
    public double Percentile { get; set; }
    public double Value { get; set; }
}

