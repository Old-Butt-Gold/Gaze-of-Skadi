import { useQuery } from '@tanstack/react-query';
import { resourceService } from '../../services/resourceService';
import type {HeroAbility} from "../../types/heroAbility.ts";

export const useHeroAbilities = (heroName: string) => {
    return useQuery<HeroAbility | undefined, Error>({
        queryKey: ['heroAbilities', heroName],
        queryFn: async () => {
            const allAbilities = await resourceService.getHeroAbilities();

            return allAbilities[heroName];
        },
        staleTime: 1000 * 60 * 60 * 24, // 24 часа
    });
};
