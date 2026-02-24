import { useQuery } from '@tanstack/react-query';
import { matchService } from '../../services/matchService';

export const useMatchObjectives = (matchId: number, isParsed: boolean) => {
  return useQuery({
    queryKey: ['matchObjectives', matchId],
    queryFn: () => matchService.getMatchObjectives(matchId),
    enabled: !!matchId && isParsed,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
