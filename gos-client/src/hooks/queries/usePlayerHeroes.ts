import { useQuery } from '@tanstack/react-query';
import { playerService } from '../../services/playerService';
import type { PlayerEndpointParameters } from '../../types/player';

export const usePlayerHeroes = (accountId: number, params: PlayerEndpointParameters) => {
    return useQuery({
        queryKey: ['player_heroes', accountId, params],
        queryFn: () => playerService.getPlayerHeroes(accountId, params),
        enabled: !!accountId && !isNaN(accountId),
        staleTime: 1000 * 60 * 5,
    });
};