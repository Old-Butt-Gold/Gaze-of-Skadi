import type {BooleanState} from "./common.ts";

export const HeroPrimaryAttribute = {
  Agility: 1,
  Intelligence: 2,
  Strength: 3,
  All: 4,
} as const;

export type HeroPrimaryAttribute = typeof HeroPrimaryAttribute[keyof typeof HeroPrimaryAttribute];

export const HeroAttackType = {
  Melee: 1,
  Ranged: 2,
} as const;

export type HeroAttackType = typeof HeroAttackType[keyof typeof HeroAttackType];

export const HeroRole = {
  Carry: 0,
  Disabler: 1,
  Durable: 2,
  Escape: 3,
  Initiator: 4,
  Jungler: 5,
  Nuker: 6,
  Pusher: 7,
  Support: 8,
} as const;

export type HeroRole = typeof HeroRole[keyof typeof HeroRole];

export interface HeroInfo {
  id: number;
  name: string; // npc_dota_hero_...
  localized_name: string;
  primary_attr: HeroPrimaryAttribute;
  attack_type: HeroAttackType;
  roles: HeroRole[];
  lore: string;
  img: string; // Full horizontal image
  icon: string; // Small icon
  video: string;
  base_health: number;
  base_health_regen: number;
  base_mana: number;
  base_mana_regen: number;
  base_armor: number;
  base_mr: number;
  base_attack_min: number;
  base_attack_max: number;
  base_str: number;
  base_agi: number;
  base_int: number;
  str_gain: number;
  agi_gain: number;
  int_gain: number;
  attack_range: number;
  move_speed: number;
  turn_rate: number;
  cm_enabled: BooleanState;
  legs: number; // Important stat! :)
  day_vision: number;
  night_vision: number;
}

export type HeroDictionary = Record<string, HeroInfo>;

export type HeroStatsIcon = 'armor' | 'attack' | 'move_speed';
