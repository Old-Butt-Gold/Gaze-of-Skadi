import { useQuery } from '@tanstack/react-query';
import { commonService } from '../../services/commonService';
import type { ItemTimingDto } from '../../types/scenarios';

export const useItemTimings = (heroId: number | null) => {
  return useQuery<ItemTimingDto[], Error>({
    queryKey: ['scenarios', 'items', heroId],
    queryFn: () => commonService.getItemTimings(heroId!),
    enabled: !!heroId, // Запрос только если выбран герой
    staleTime: 1000 * 60 * 60,
  });
};
