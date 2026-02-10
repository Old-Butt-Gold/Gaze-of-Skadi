import { useQuery } from '@tanstack/react-query';
import { playerService } from '../../services/playerService';
import type {PlayerEndpointParameters, PlayerField} from '../../types/player';

export const usePlayerHistograms = (
  accountId: number, field: PlayerField, params: PlayerEndpointParameters
) => {
  return useQuery({
    queryKey: ['player_histograms', accountId, field, params],
    queryFn: () => playerService.getPlayerHistograms(accountId, field, params),
    enabled: !!accountId && !isNaN(accountId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
