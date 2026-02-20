import { useQuery } from '@tanstack/react-query';
import { matchService } from '../../services/matchService';

export const useMatchCosmetics = (matchId: number, isParsed: boolean) => {
  return useQuery({
    queryKey: ['matchCosmetics', matchId],
    queryFn: () => matchService.getMatchCosmetics(matchId),
    enabled: !!matchId && isParsed,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
