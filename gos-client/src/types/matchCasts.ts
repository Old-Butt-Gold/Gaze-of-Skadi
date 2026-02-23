export interface HitCastDto {
  targetHeroKey: string;
  hitCount: number;
}

export interface ItemCastDto {
  itemKey: string;
  timesUsed: number;
}

export interface AbilityCastDto {
  abilityKey: string;
  timesUsed: number;
  targets?: Record<number, number> | null;
}

export interface PlayerCastsDto {
  playerIndex: number;
  abilities: AbilityCastDto[];
  items: ItemCastDto[];
  hits: HitCastDto[];
}
