import { useQuery } from '@tanstack/react-query';
import { playerService } from '../../services/playerService';
import type { PlayerEndpointParameters, PlayerField } from '../../types/player';

export const usePlayerRecords = (
  accountId: number,
  field: PlayerField,
  params: PlayerEndpointParameters
) => {
  return useQuery({
    queryKey: ['player_records', accountId, field, params],
    queryFn: () => playerService.getPlayerRecords(accountId, field, params),
    enabled: !!accountId && !isNaN(accountId),
    staleTime: 1000 * 60 * 5,
  });
};
