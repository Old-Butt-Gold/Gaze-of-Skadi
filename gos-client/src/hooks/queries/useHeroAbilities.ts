import { useQuery } from '@tanstack/react-query';
import { resourceService } from '../../services/resourceService';
import type { HeroAbility } from "../../types/heroAbility.ts";

export const useHeroAbilities = (heroName: string) => {
  return useQuery<Record<string, HeroAbility>, Error, HeroAbility | undefined>({
    queryKey: ['heroAbilities'],
    queryFn: resourceService.getHeroAbilities,
    select: (allAbilities) => {
      if (!heroName) return undefined;
      return allAbilities[heroName];
    },
    staleTime: 1000 * 60 * 60 * 24,
    enabled: Boolean(heroName)
  });
};
