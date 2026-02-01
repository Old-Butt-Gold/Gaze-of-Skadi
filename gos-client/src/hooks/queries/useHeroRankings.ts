import { useQuery } from '@tanstack/react-query';
import type {HeroRankingDto} from "../../types/heroRankings.ts";
import {heroService} from "../../services/heroService.ts";

export const useHeroRankings = (heroId: number) => {
  return useQuery<HeroRankingDto, Error>({
    queryKey: ['hero', heroId, 'rankings'],
    queryFn: () => heroService.getHeroRankings(heroId),
    enabled: !!heroId,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};
