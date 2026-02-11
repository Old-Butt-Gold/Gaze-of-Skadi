import type {BaseEnum, LaneRole} from "./common";

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

export type ScenarioData = ItemTimingDto | LaneRolesDto;
