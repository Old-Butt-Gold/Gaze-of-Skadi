import { useQuery } from '@tanstack/react-query';
import { heroService } from '../../services/heroService';
import type { HeroPlayerDto } from '../../types/heroPlayers';

export const useHeroPlayers = (heroId: number) => {
  return useQuery<HeroPlayerDto[], Error>({
    queryKey: ['hero', heroId, 'players'],
    queryFn: () => heroService.getHeroPlayers(heroId),
    enabled: !!heroId,
    staleTime: 1000 * 60 * 15, // 15 минут кэш
  });
};
