export interface HeroStatsDto {
  heroId: number;
  matchCount: number;
  winCount: number;
  winRate: number;
}

export interface HeroesMetaDto {
  heroesOverall: HeroStatsDto[];
  heroesPos1: HeroStatsDto[];
  heroesPos2: HeroStatsDto[];
  heroesPos3: HeroStatsDto[];
  heroesPos4: HeroStatsDto[];
  heroesPos5: HeroStatsDto[];
}
