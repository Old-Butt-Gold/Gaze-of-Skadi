import {
    type Behavior,
    BooleanState,
    type DamageType,
    type Dispellable,
    type TargetTeam,
    type TargetType
} from './common'; // Предполагаем, что этот тип уже существует

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

export const NeutralItemTier = {
  FirstTier: 1,
  SecondTier: 2,
  ThirdTier: 3,
  FourthTier: 4,
  FifthTier: 5,
} as const;
export type NeutralItemTier = typeof NeutralItemTier[keyof typeof NeutralItemTier];

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
  abilities: ItemAbility[] | null;
  hint: string[] | null;
  id: number;
  img: string; // URL изображения
  dname: string | null; // Название предмета
  qual: ItemType | null;
  cost: number | null;
  behavior: Behavior[] | null;
  notes: string | null;
  attrib: ItemAttribute[] | null;
  mc: number | null; // Mana Cost
  hc: number | null; // Health Cost
  cd: number | null; // Cooldown
  lore: string | null;
  components: string[] | null;
  created: BooleanState;
  charges: string | null;
  dmg_type: DamageType | null;
  target_team: TargetTeam[];
  target_type: TargetType[]
  dispellable: Dispellable | null;
  bkbpierce: BooleanState | null;
  tier: NeutralItemTier | null; // Neutral Item Tier
}

export type ItemDictionary = Record<string, Item>

export type ItemIdDictionary = Record<string, string>;
