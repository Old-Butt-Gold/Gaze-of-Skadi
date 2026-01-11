import { useQuery } from '@tanstack/react-query';
import { commonService } from '../../services/commonService';
import type {DistributionResponseDto} from "../../types/distribution.ts";

export const useDistributions = () => {
  return useQuery<DistributionResponseDto, Error>({
    queryKey: ['common', 'distribution'],
    queryFn: commonService.getDistributions,
    staleTime: 1000 * 60 * 10, // Кешируем на 10 минут
    retry: 1,
  });
};
