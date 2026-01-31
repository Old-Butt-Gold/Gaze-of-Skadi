import { useQuery } from '@tanstack/react-query';
import { heroService } from '../../services/heroService';
import type {HeroStatsGroupedDto} from "../../types/heroStats.ts";

export const useHeroStats = () => {
  return useQuery<HeroStatsGroupedDto[], Error>({
    queryKey: ['heroes', 'stats'],
    queryFn: heroService.getHeroStats,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
