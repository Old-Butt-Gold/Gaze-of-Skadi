export interface BenchmarkValueDto {
  percentile: number; // 0.1 to 1.0
  value: number;
}

export interface BenchmarkResultDto {
  goldPerMinutes: BenchmarkValueDto[];
  xpPerMinutes: BenchmarkValueDto[];
  killsPerMinutes: BenchmarkValueDto[];
  lastHitPerMinutes: BenchmarkValueDto[];
  heroDamagePerMinutes: BenchmarkValueDto[];
  heroHealingPerMinutes: BenchmarkValueDto[];
  towerDamage: BenchmarkValueDto[];
}

export interface HeroBenchmarkDto {
  heroId: number;
  result: BenchmarkResultDto;
}
