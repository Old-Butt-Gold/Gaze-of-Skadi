import { useQuery } from '@tanstack/react-query';
import { playerService } from '../../services/playerService';

export const usePlayer = (accountId: number) => {
  return useQuery({
    queryKey: ['player', accountId],
    queryFn: () => playerService.getPlayerById(accountId),
    enabled: !!accountId && !isNaN(accountId),
    staleTime: 1000 * 60 * 5
  });
};

