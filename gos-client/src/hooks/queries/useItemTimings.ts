import { useQuery } from '@tanstack/react-query';
import { commonService } from '../../services/commonService';
import type { ItemTimingDto } from '../../types/scenarios';

export const useItemTimings = () => {
  return useQuery<ItemTimingDto[], Error>({
    queryKey: ['scenarios', 'items'],
    queryFn: commonService.getItemTimings,
    staleTime: 1000 * 60 * 10, // 10 min
  });
};
