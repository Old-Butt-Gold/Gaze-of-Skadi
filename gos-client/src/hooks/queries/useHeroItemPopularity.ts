import { useQuery } from '@tanstack/react-query';
import { heroService } from '../../services/heroService';
import type { HeroItemPopularityDto } from '../../types/heroItemPopularity';

export const useHeroItemPopularity = (heroId: number) => {
  return useQuery<HeroItemPopularityDto, Error>({
    queryKey: ['hero', heroId, 'itemPopularity'],
    queryFn: () => heroService.getHeroItemPopularity(heroId),
    enabled: !!heroId,
    staleTime: 1000 * 60 * 30, // 30 mins
  });
};
