import { useQuery } from '@tanstack/react-query';
import { playerService } from '../../services/playerService';
import type { PlayerEndpointParameters } from '../../types/player';

export const usePlayerActivity = (accountId: number, params: PlayerEndpointParameters) => {
  return useQuery({
    queryKey: ['player_activity', accountId, params],
    queryFn: () => playerService.getPlayerActivity(accountId, params),
    enabled: !!accountId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
