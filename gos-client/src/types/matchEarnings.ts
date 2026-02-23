import type {BaseEnum} from "./common.ts";

export interface IncomeReasonDto<TEnum> {
  reason: BaseEnum<TEnum>;
  amount: number;
}

export const GoldReason = {
  Others: 0,
  Deaths: 1,
  Buybacks: 2,
  Abandon: 5,
  SellItems: 6,
  Buildings: 11,
  Heroes: 12,
  Creeps: 13,
  Neutrals: 14,
  Roshan: 15,
  Courier: 16,
  BountyRunes: 17,
  Wards: 20,
} as const;

export type GoldReason = typeof GoldReason[keyof typeof GoldReason];

export const XpReason = {
  Others: 0,
  Heroes: 1,
  Creeps: 2,
  Roshan: 3,
  WisdomRunes: 4,
} as const;

export type XpReason = typeof XpReason[keyof typeof XpReason];

export interface PlayerEarningsDto {
  playerIndex: number;
  heroesKilled: number;
  laneCreepsKilled: number;
  neutralCreepsKilled: number;
  ancientCreepsKilled: number;
  towersKilled: number;
  couriersKilled: number;
  roshanKills: number;
  observerKills: number;
  necronomiconKills: number;
  sentryKills: number;
  goldReasons: IncomeReasonDto<GoldReason>[];
  xpReasons: IncomeReasonDto<XpReason>[];
}
