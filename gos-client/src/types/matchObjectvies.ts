import type { BaseEnum } from "./common";

export const Rune = {
  AmplifyDamage: 0,
  Haste: 1,
  Illusion: 2,
  Invisibility: 3,
  Regeneration: 4,
  Bounty: 5,
  Arcane: 6,
  Water: 7,
  Wisdom: 8,
  Shield: 9,
} as const;

export type Rune = typeof Rune[keyof typeof Rune];

export interface DamageDataDto {
  key: string;
  value: number;
}

export interface RunesDataDto {
  key: BaseEnum<Rune>;
  value: number;
}

export interface ObjectivesDataDto {
  damage: DamageDataDto[];
  runes: RunesDataDto[];
}

export interface PlayerObjectivesDto {
  playerIndex: number;
  objectives: ObjectivesDataDto;
}
