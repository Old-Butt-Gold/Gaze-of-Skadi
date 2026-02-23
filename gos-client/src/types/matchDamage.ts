export interface HeroKillsDto {
  heroId: number;
  times: number;
}

export interface HeroDamageDto {
  heroId: number;
  damage: number;
}

export interface DamageBreakdownDto {
  targetHeroId: number;
  damage: number;
}

export interface DamageInflictorDto {
  inflictorKey: string;
  totalDamage: number;
  breakdown: DamageBreakdownDto[];
}

export interface DamageSummaryDto {
  inflictorKey: string;
  totalDamage: number;
}

export interface PlayerDamageDto {
  playerIndex: number;
  killedHeroes: HeroKillsDto[];
  killedByHeroes: HeroKillsDto[];
  damageDealtToHeroes: HeroDamageDto[];
  damageTakenFromHeroes: HeroDamageDto[];
  damageDealtByInflictor: DamageInflictorDto[];
  damageTakenByInflictor: DamageSummaryDto[];
}
