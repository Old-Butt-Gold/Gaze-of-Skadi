import { useQuery } from '@tanstack/react-query';
import { playerService } from '../../services/playerService';
import type { PlayerEndpointParameters } from '../../types/player';

export const usePlayerTotals = (accountId: number, params: PlayerEndpointParameters, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['player_totals', accountId, params],
    queryFn: () => playerService.getPlayerTotals(accountId, params),
    enabled: enabled && !!accountId && !isNaN(accountId),
    staleTime: 1000 * 60 * 5,
  });
};
