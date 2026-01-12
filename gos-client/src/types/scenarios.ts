import type {BaseEnum} from "./common";

export interface BaseScenarioData {
  games: number;
  wins: number;
  time: number;
  heroId: number;
}

export interface ItemTimingDto extends BaseScenarioData {
  item: string;
}

export interface LaneRolesDto extends BaseScenarioData {
  laneRole: BaseEnum<LaneRole>;
}

export const LaneRole = {
  None: 0,
  SafeLane: 1,
  MidLane: 2,
  OffLane: 3,
  Jungle: 4,
} as const;

export type LaneRole = typeof LaneRole[keyof typeof LaneRole];
