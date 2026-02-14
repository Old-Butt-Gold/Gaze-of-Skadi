import { useQuery } from '@tanstack/react-query';
import { playerService } from '../../services/playerService';
import type { PlayerEndpointParameters } from '../../types/player';

export const usePlayerMatches = (accountId: number, params: PlayerEndpointParameters) => {
  return useQuery({
    queryKey: ['player_matches', accountId, params],
    queryFn: () => playerService.getPlayerMatches(accountId, params),
    enabled: !!accountId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
