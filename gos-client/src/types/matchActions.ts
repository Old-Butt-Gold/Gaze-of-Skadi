import { type BaseEnum } from "./common";

export interface ActionsDataDto {
  key: BaseEnum<UnitOrder>;
  value: number;
}

export interface PlayerActionsDto {
  playerIndex: number;
  actions: ActionsDataDto[];
  actionsPerMin: number;
}

export const UnitOrder = {
  None: 0,
  MoveToPosition: 1,
  MoveToTarget: 2,
  AttackMove: 3,
  AttackTarget: 4,
  CastPosition: 5,
  CastTarget: 6,
  CastTargetTree: 7,
  CastNoTarget: 8,
  CastToggle: 9,
  HoldPosition: 10,
  TrainAbility: 11,
  DropItem: 12,
  GiveItem: 13,
  PickupItem: 14,
  PickupRune: 15,
  PurchaseItem: 16,
  SellItem: 17,
  DisassembleItem: 18,
  MoveItem: 19,
  CastToggleAuto: 20,
  Stop: 21,
  Taunt: 22,
  Buyback: 23,
  Glyph: 24,
  EjectItemFromStash: 25,
  CastRune: 26,
  PingAbility: 27,
  MoveToDirection: 28,
  Patrol: 29,
  VectorTargetPosition: 30,
  Radar: 31,
  SetItemCombineLock: 32,
  Continue: 33,
  VectorTargetCanceled: 34,
  CastRiverPaint: 35,
  PregameAdjustItemAssignment: 36,
  DropItemAtFountain: 37,
  TakeItemFromNeutralItemStash: 38,
  MoveRelative: 39,
  CastToggleAlt: 40,
} as const;

export type UnitOrder = typeof UnitOrder[keyof typeof UnitOrder];
