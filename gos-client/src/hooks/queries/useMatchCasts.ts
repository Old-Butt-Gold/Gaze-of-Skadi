import { useQuery } from '@tanstack/react-query';
import { matchService } from '../../services/matchService';

export const useMatchCasts = (matchId: number, isParsed: boolean) => {
  return useQuery({
    queryKey: ['matchCasts', matchId],
    queryFn: () => matchService.getMatchCasts(matchId),
    enabled: !!matchId && isParsed,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
