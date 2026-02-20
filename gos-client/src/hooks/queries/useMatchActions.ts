import { useQuery } from '@tanstack/react-query';
import { matchService } from '../../services/matchService';

export const useMatchActions = (matchId: number, isParsed: boolean) => {
  return useQuery({
    queryKey: ['matchActions', matchId],
    queryFn: () => matchService.getMatchActions(matchId),
    enabled: !!matchId && isParsed,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
