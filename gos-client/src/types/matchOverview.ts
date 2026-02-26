import type { BaseEnum, TeamEnum } from "./common";

export const BarracksStatus = {
  None: 0,
  MeleeTop: 1 << 0,
  RangedTop: 1 << 1,
  MeleeMiddle: 1 << 2,
  RangedMiddle: 1 << 3,
  MeleeBottom: 1 << 4,
  RangedBottom: 1 << 5,
} as const;

export const TowerStatus = {
  None: 0,
  T4Left: 1 << 10,
  T4Right: 1 << 9,
  BottomTier3: 1 << 8,
  BottomTier2: 1 << 7,
  BottomTier1: 1 << 6,
  MidTier3: 1 << 5,
  MidTier2: 1 << 4,
  MidTier1: 1 << 3,
  TopTier3: 1 << 2,
  TopTier2: 1 << 1,
  TopTier1: 1 << 0,
} as const;

export interface PickBanDto {
  order: number;
  isPick: boolean | null;
  team: BaseEnum<TeamEnum>;
  heroId: number;
}

export interface MatchOverviewDto {
  picksBans: PickBanDto[];
  direBarracksStatus: BaseEnum<number>;
  radiantBarracksStatus: BaseEnum<number>;
  radiantTowersStatus: BaseEnum<number>;
  direTowersStatus: BaseEnum<number>;
}
