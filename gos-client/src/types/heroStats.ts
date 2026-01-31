export interface BaseStatsDto {
  pick: number;
  win: number;
}

export type TurboStatsDto = BaseStatsDto

export interface ProStatsDto extends BaseStatsDto {
  ban: number;
}

export type RankTierStatsDto = BaseStatsDto

export interface RankedStatsDto {
  herald: RankTierStatsDto;
  guardian: RankTierStatsDto;
  crusader: RankTierStatsDto;
  archon: RankTierStatsDto;
  legend: RankTierStatsDto;
  ancient: RankTierStatsDto;
  divine: RankTierStatsDto;
  pub: RankTierStatsDto;
}

export interface HeroStatsGroupedDto {
  id: number;
  turbo: TurboStatsDto;
  pro: ProStatsDto;
  ranked: RankedStatsDto;
}
