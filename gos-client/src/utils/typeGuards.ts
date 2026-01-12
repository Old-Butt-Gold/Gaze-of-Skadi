import type {ItemTimingDto, LaneRolesDto} from "../types/scenarios.ts";

export const isItemTiming = (item: ItemTimingDto | LaneRolesDto): item is ItemTimingDto => {
  return (item as ItemTimingDto).item !== undefined;
};
