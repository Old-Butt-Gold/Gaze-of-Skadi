import { apiClient } from '../api/apiClient.ts';
import type {DistributionResponseDto} from "../types/distribution.ts";

export const commonService = {
  getDistributions: async (): Promise<DistributionResponseDto> => {
    return apiClient.get('/common/distributions');
  },
};
