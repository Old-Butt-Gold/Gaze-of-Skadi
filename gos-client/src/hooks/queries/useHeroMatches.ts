import { useQuery } from '@tanstack/react-query';
import { heroService } from '../../services/heroService';
import type {HeroMatchDto} from "../../types/heroMatch.ts";

export const useHeroMatches = (heroId: number) => {
  return useQuery<HeroMatchDto[], Error>({
    queryKey: ['hero', heroId, 'matches'],
    queryFn: () => heroService.getHeroMatches(heroId),
    enabled: !!heroId,
    staleTime: 1000 * 60 * 5, // 5 минут кэш (матчи обновляются часто)
  });
};
