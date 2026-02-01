import { useQuery } from '@tanstack/react-query';
import { heroService } from '../../services/heroService';
import type { HeroMatchupDto } from '../../types/heroMatchups';

export const useHeroMatchups = (heroId: number) => {
  return useQuery<HeroMatchupDto[], Error>({
    queryKey: ['hero', heroId, 'matchups'],
    queryFn: () => heroService.getHeroMatchups(heroId),
    enabled: !!heroId,
    staleTime: 1000 * 60 * 15, // 15 минут кэш
  });
};
