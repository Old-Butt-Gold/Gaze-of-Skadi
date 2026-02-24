import type {BaseEnum, TeamEnum} from "./common";

export interface TeamfightPositionDto {
  x: number;
  y: number;
}

export interface AbilityUseDto {
  abilityKey: string;
  uses: number;
}

export interface ItemUseDto {
  itemKey: string;
  uses: number;
}

export interface KilledHeroDto {
  heroId: number;
  times: number;
}

export interface TeamfightPlayerDto {
  playerIndex: number;
  wasDead: boolean;
  damage: number;
  healing: number;
  goldDelta: number;
  xpDelta: number;
  usedBuyback: boolean;
  abilityUses: AbilityUseDto[];
  itemUses: ItemUseDto[];
  killedHeroes: KilledHeroDto[];
  deathPositions: TeamfightPositionDto[];
}

export interface TeamfightDetailedDto {
  startTime: number;
  endTime: number;
  totalDeaths: number;
  xpAdvantage: number;
  goldAdvantage: number;
  winner: BaseEnum<TeamEnum>;
  players: TeamfightPlayerDto[];
}
