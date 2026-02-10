import { useQuery } from '@tanstack/react-query';
import { playerService } from '../../services/playerService';
import type { PlayerEndpointParameters } from '../../types/player';

export const usePlayerPeers = (accountId: number, params: PlayerEndpointParameters) => {
  return useQuery({
    queryKey: ['player_peers', accountId, params],
    queryFn: () => playerService.getPlayerPeers(accountId, params),
    enabled: !!accountId && !isNaN(accountId),
    staleTime: 1000 * 60 * 5,
  });
};
