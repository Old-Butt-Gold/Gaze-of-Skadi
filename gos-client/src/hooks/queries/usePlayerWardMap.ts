import { useQuery } from '@tanstack/react-query';
import { playerService } from '../../services/playerService';
import type { PlayerEndpointParameters } from '../../types/player';

export const usePlayerWardMap = (accountId: number, params: PlayerEndpointParameters) => {
  return useQuery({
    queryKey: ['player_wardmap', accountId, params],
    queryFn: () => playerService.getPlayerWardMap(accountId, params),
    enabled: !!accountId && !isNaN(accountId),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
