import { apiClient } from '../api/apiClient.ts';
import type {DistributionResponseDto} from "../types/distribution.ts";
import type {RecordDto, RecordField} from "../types/records.ts";

export const commonService = {
  getDistributions: async (): Promise<DistributionResponseDto> => {
    return apiClient.get('/common/distributions');
  },

  getRecordsByField: async (field: RecordField): Promise<RecordDto[]> => {
    return apiClient.get(`/Common/records/${field}`);
  },
};
