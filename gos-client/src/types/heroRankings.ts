import type {BaseEnum, Rank} from "./common.ts";

export interface RankingPlayerDto {
  accountId: number;
  score: number;
  personaName: string;
  avatar: string | null;
  rankTier: BaseEnum<Rank> | null;
}

export interface HeroRankingDto {
  heroId: number;
  rankings: RankingPlayerDto[];
}
