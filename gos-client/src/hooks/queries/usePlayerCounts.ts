import { useQuery } from '@tanstack/react-query';
import { playerService } from '../../services/playerService';
import type { PlayerEndpointParameters } from '../../types/player';

export const usePlayerCounts = (accountId: number, params: PlayerEndpointParameters) => {
  return useQuery({
    queryKey: ['player_counts', accountId, params],
    queryFn: () => playerService.getPlayerCounts(accountId, params),
    enabled: !!accountId && !isNaN(accountId),
    staleTime: 1000 * 60 * 5,
  });
};
