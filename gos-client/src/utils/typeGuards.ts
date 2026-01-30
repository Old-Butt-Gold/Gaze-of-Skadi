// src/utils/typeGuards.ts
import type {ItemTimingDto, LaneRolesDto, ScenarioData} from "../types/scenarios.ts";

export function isItemTiming(data: ScenarioData): data is ItemTimingDto {
  return (data as ItemTimingDto).item !== undefined;
}

export function isLaneRole(data: ScenarioData): data is LaneRolesDto {
  return (data as LaneRolesDto).laneRole !== undefined;
}
