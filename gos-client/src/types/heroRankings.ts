export interface RankingPlayerDto {
  accountId: number;
  score: number;
  personaName: string;
  avatar: string | null;
  rankTier: number;
}

export interface HeroRankingDto {
  heroId: number;
  rankings: RankingPlayerDto[];
}
