export interface BenchmarkDataDto {
  name: string;
  raw: number | null;
  percentage: number | null;
}

export interface PlayerBenchmarkDto {
  playerIndex: number;
  benchmarks: BenchmarkDataDto[];
}
