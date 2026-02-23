import { useQuery } from '@tanstack/react-query';
import { matchService } from '../../services/matchService';

export const useMatchEarnings = (matchId: number, isParsed: boolean) => {
  return useQuery({
    queryKey: ['matchEarnings', matchId],
    queryFn: () => matchService.getMatchEarnings(matchId),
    enabled: !!matchId && isParsed,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
