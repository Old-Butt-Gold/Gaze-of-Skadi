import { useQuery } from '@tanstack/react-query';
import { heroService } from '../../services/heroService';
import type { HeroInfo, HeroDictionary } from '../../types/heroes';

export const useHeroes = () => {
  const query = useQuery<HeroDictionary, Error>({
    queryKey: ['heroes'],
    queryFn: heroService.getHeroes,
    staleTime: 1000 * 60 * 60, // 24 hours cache
    refetchOnWindowFocus: false,
  });

  const getHero = (id: number | null | undefined): HeroInfo | null => {
    if (!id || !query.data) return null;
    return query.data[id.toString()] || null;
  };

  return { ...query, getHero };
};
