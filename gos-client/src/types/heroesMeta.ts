export interface HeroStatsDto {
  heroId: number;
  matchCount: number;
  winCount: number;
  winRate: number;
}

export interface HeroesMetaDto {
  heroesPos1: HeroStatsDto[]; // Safe Lane
  heroesPos2: HeroStatsDto[]; // Mid Lane
  heroesPos3: HeroStatsDto[]; // Off Lane
  heroesPos4: HeroStatsDto[]; // Soft Support
  heroesPos5: HeroStatsDto[]; // Hard Support
}
