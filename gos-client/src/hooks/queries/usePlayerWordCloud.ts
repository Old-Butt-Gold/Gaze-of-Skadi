import { useQuery } from '@tanstack/react-query';
import { playerService } from '../../services/playerService';
import type { PlayerEndpointParameters } from '../../types/player';

export const usePlayerWordCloud = (accountId: number, params: PlayerEndpointParameters) => {
    return useQuery({
        queryKey: ['player_wordcloud', accountId, params],
        queryFn: () => playerService.getPlayerWordCloud(accountId, params),
        enabled: !!accountId && !isNaN(accountId),
        staleTime: 1000 * 60 * 60,
    });
};
