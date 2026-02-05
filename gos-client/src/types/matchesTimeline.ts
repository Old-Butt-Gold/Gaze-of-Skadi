export interface TimeSeriesStat {
  monthUnix: number;
  matchCount: number;
}

export interface MatchesByGameModeDto {
  allPick: TimeSeriesStat[];
  captainsMode: TimeSeriesStat[];
  allPickRanked: TimeSeriesStat[];
  turbo: TimeSeriesStat[];
}

export interface MatchesByRegionDto {
  china: TimeSeriesStat[];
  sea: TimeSeriesStat[];
  northAmerica: TimeSeriesStat[];
  southAmerica: TimeSeriesStat[];
  europe: TimeSeriesStat[];
}

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
