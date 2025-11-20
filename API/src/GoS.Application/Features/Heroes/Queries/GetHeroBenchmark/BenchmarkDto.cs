namespace GoS.Application.Features.Heroes.Queries.GetHeroBenchmark;

public class BenchmarkDto
{
    public long HeroId { get; set; }
    public BenchmarkResultDto Result { get; set; } = new();
}

public class BenchmarkResultDto
{
    public List<BenchmarkValueDto> GoldPerMinutes { get; set; } = [];
    public List<BenchmarkValueDto> XpPerMinutes { get; set; } = [];
    public List<BenchmarkValueDto> KillsPerMinutes { get; set; } = [];
    public List<BenchmarkValueDto> LastHitPerMinutes { get; set; } = [];
    public List<BenchmarkValueDto> HeroDamagePerMinutes { get; set; } = [];
    public List<BenchmarkValueDto> HeroHealingPerMinutes { get; set; } = [];
    public List<BenchmarkValueDto> TowerDamage { get; set; } = [];
}

public class BenchmarkValueDto
{
    public double Percentile { get; set; }
    public double Value { get; set; }
}

