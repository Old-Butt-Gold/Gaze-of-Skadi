import type { BaseEnum } from "./common";

export const VisionItemType = {
  ObserverWard: 0,
  SentryWard: 1,
  Dust: 2,
  Gem: 3,
  Smoke: 4
} as const;

export type VisionItemType = typeof VisionItemType[keyof typeof VisionItemType];

export const WardType = {
  Observer: 0,
  Sentry: 1
} as const;

export type WardType = typeof WardType[keyof typeof WardType];

export interface VisionItemDto {
  itemType: BaseEnum<VisionItemType>;
  quantity: number;
}

export interface WardPlacementDto {
  type: BaseEnum<WardType>;
  ownerIndex: number;
  placementTime: number;
  removalTime: number;
  duration: number;
  destroyedById: number | null;
  x: number;
  y: number;
}

export interface PlayerVisionDto {
  playerIndex: number;
  purchasedItems: VisionItemDto[];
}

export interface MatchVisionDto {
  players: PlayerVisionDto[];
  wardPlacements: WardPlacementDto[];
}
