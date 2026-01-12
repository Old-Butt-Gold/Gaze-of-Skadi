import { apiClient } from '../api/apiClient.ts';
import type {DistributionResponseDto} from "../types/distribution.ts";
import type {RecordDto, RecordField} from "../types/records.ts";
import type {ItemTimingDto, LaneRolesDto} from "../types/scenarios.ts";

export const commonService = {
  getDistributions: async (): Promise<DistributionResponseDto> => {
    return apiClient.get('/common/distributions');
  },

  getRecordsByField: async (field: RecordField): Promise<RecordDto[]> => {
    return apiClient.get(`/common/records/${field}`);
  },

  getItemTimings: async (heroId: number): Promise<ItemTimingDto[]> => {
    return apiClient.get(`/common/item-timings/${heroId}`);
  },

  getLaneRoles: async (heroId: number): Promise<LaneRolesDto[]> => {
    return apiClient.get(`/common/lane-roles/${heroId}`);
  },
};
