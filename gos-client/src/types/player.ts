import {type BaseEnum, BooleanState, type Rank} from './common';

export interface PlayerEndpointParameters {
  limit?: number;
  offset?: number;
  win?: number; // 0 or 1
  patch?: number;
  game_mode?: number;
  lobby_type?: number;
  region?: number;
  date?: number;
  lane_role?: number;
  hero_id?: number;
  is_radiant?: number; // 0 or 1
  included_account_ids?: number[];
  excluded_account_ids?: number[];
  with_hero_ids?: number[];
  against_hero_ids?: number[];
  significant?: number;
  having?: number;
  sort?: string;
}

export interface AliasDto {
  personaName: string;
  nameSince: number;
}

export interface ProfileInfoDto {
  accountId: number;
  personaName: string;
  name: string | null;
  plus: BaseEnum<BooleanState> | null;
  avatarFull: string | null;
  fhUnavailable: BaseEnum<BooleanState> | null;
  profileUrl: string | null;
}

export interface PlayerDto {
  rankTier: BaseEnum<Rank> | null;
  leaderboardRank: number | null;
  profile: ProfileInfoDto;
  aliases: AliasDto[];
}

export const PlayerField = {
  Kills: 0,
  Deaths: 1,
  Assists: 2,
  Kda: 3,
  GoldPerMin: 4,
  XpPerMin: 5,
  LastHits: 6,
  Denies: 7,
  LaneEfficiencyPct: 8,
  Duration: 9,
  Level: 10,
  HeroDamage: 11,
  TowerDamage: 12,
  HeroHealing: 13,
  Stuns: 14,
  TowerKills: 15,
  NeutralKills: 16,
  CourierKills: 17,
  PurchaseTpScroll: 18,
  PurchaseWardObserver: 19,
  PurchaseWardSentry: 20,
  PurchaseGem: 21,
  PurchaseRapier: 22,
  Pings: 23,
  Throw: 24,
  Comeback: 25,
  Stomp: 26,
  Loss: 27,
  ActionsPerMin: 28
} as const;

export type PlayerField = (typeof PlayerField)[keyof typeof PlayerField];
