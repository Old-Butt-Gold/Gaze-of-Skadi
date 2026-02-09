import { type BaseEnum } from './common';

export const PlayerTotalField = {
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

export type PlayerTotalField = (typeof PlayerTotalField)[keyof typeof PlayerTotalField];

export interface PlayerTotalDto {
  field: BaseEnum<PlayerTotalField>;
  sum: number;
}
