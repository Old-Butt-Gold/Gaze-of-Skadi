import type {Rank} from "./common.ts";

export interface RankingPlayerDto {
  accountId: number;
  score: number;
  personaName: string;
  avatar: string | null;
  rankTier: Rank;
}

export interface HeroRankingDto {
  heroId: number;
  rankings: RankingPlayerDto[];
}
