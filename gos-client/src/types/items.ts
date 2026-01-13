import { BooleanState } from './common'; // Предполагаем, что этот тип уже существует

export const ItemType = {
  Rare: 0,
  Artifact: 1,
  SecretShop: 2,
  Consumable: 3,
  Common: 4,
  Epic: 5,
  Component: 6,
} as const;
export type ItemType = typeof ItemType[keyof typeof ItemType];

export const AbilityType = {
  Active: 0,
  Passive: 1,
  Use: 2,
  Upgrade: 3,
  Toggle: 4,
} as const;
export type AbilityType = typeof AbilityType[keyof typeof AbilityType];

export const DamageType = {
  Magical: 0,
  Physical: 1,
  Pure: 2,
} as const;
export type DamageType = typeof DamageType[keyof typeof DamageType];

export const NeutralItemTier = {
  FirstTier: 1,
  SecondTier: 2,
  ThirdTier: 3,
  FourthTier: 4,
  FifthTier: 5,
} as const;
export type NeutralItemTier = typeof NeutralItemTier[keyof typeof NeutralItemTier];

export const TargetType = {
  Hero: 0,
  Basic: 1,
  Building: 2,
  Tree: 3,
} as const;
export type TargetType = typeof TargetType[keyof typeof TargetType];

export const TargetTeam = {
  Enemy: 0,
  Friendly: 1,
  Both: 2,
} as const;
export type TargetTeam = typeof TargetTeam[keyof typeof TargetTeam];

export const Behavior = {
  UnitTarget: 0,
  Channeled: 1,
  Hidden: 2,
  Passive: 3,
  NoTarget: 4,
  Autocast: 5,
  InstantCast: 6,
  AreaOfEffect: 7,
  PointTarget: 8,
  AttackModifier: 9,
} as const;
export type Behavior = typeof Behavior[keyof typeof Behavior];

export const Dispellable =
{
  No: 0,
  StrongDispelsOnly: 1,
  Yes: 2,
} as const;
export type Dispellable = typeof Dispellable[keyof typeof Dispellable];

export interface ItemAbility {
  type: AbilityType;
  title: string;
  description: string;
}

export interface ItemAttribute {
  key: string;
  value: string;
  display?: string;
}

export interface Item {
  abilities?: ItemAbility[];
  hint?: string[];
  id: number;
  img: string; // URL изображения
  dname?: string; // Название предмета
  qual?: ItemType;
  cost?: number;
  behavior?: Behavior[];
  notes?: string;
  attrib: ItemAttribute[];
  mc?: number; // Mana Cost
  hc?: number; // Health Cost
  cd?: number; // Cooldown
  lore?: string;
  components?: string[];
  created: BooleanState;
  charges?: string;
  dmg_type?: DamageType;
  target_team: TargetTeam[];
  target_type: TargetType[]
  dispellable?: Dispellable;
  bkbpierce?: BooleanState;
  tier?: NeutralItemTier; // Neutral Item Tier
}

export type ItemDictionary = Record<string, Item>;
