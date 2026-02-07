import { useQuery } from '@tanstack/react-query';
import { resourceService } from '../../services/resourceService';
import type { Ability } from '../../types/ability';

export const useAbilities = () => {
    const { data, isLoading, isError } = useQuery<Record<string, Ability>, Error>({
        queryKey: ['abilities'],
        queryFn: resourceService.getAbilities,
        staleTime: 1000 * 60 * 60 * 24,
    });

    const getAbility = (abilityName: string | null | undefined): Ability | null => {
        if (!data || !abilityName) return null;
        return data[abilityName] || null;
    };

    return {
        abilities: data,
        getAbility,
        isLoading,
        isError
    };
};