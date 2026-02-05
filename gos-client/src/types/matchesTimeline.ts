export interface TimeSeriesStat {
  monthUnix: number;
  matchCount: number;
}

// DTO для режимов
export interface MatchesByGameModeDto {
  allPick: TimeSeriesStat[];
  captainsMode: TimeSeriesStat[];
  allPickRanked: TimeSeriesStat[];
  turbo: TimeSeriesStat[];
}

// DTO для регионов
export interface MatchesByRegionDto {
  china: TimeSeriesStat[];
  sea: TimeSeriesStat[];
  northAmerica: TimeSeriesStat[];
  southAmerica: TimeSeriesStat[];
  europe: TimeSeriesStat[];
}

// DTO для рангов
export interface MatchesByRankDto {
  herald: TimeSeriesStat[];
  guardian: TimeSeriesStat[];
  crusader: TimeSeriesStat[];
  archon: TimeSeriesStat[];
  legend: TimeSeriesStat[];
  ancient: TimeSeriesStat[];
  divine: TimeSeriesStat[];
  immortal: TimeSeriesStat[];
}
