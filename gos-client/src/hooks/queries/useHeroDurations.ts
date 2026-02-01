import { useQuery } from '@tanstack/react-query';
import { heroService } from '../../services/heroService';
import type { HeroDurationDto } from '../../types/heroDurations';

export const useHeroDurations = (heroId: number) => {
  return useQuery<HeroDurationDto[], Error>({
    queryKey: ['hero', heroId, 'durations'],
    queryFn: () => heroService.getHeroDurations(heroId),
    enabled: !!heroId,
    staleTime: 1000 * 60 * 30,
  });
};
