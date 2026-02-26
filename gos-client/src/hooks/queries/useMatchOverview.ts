import { useQuery } from '@tanstack/react-query';
import { matchService } from '../../services/matchService';

export const useMatchOverview = (matchId: number) => {
  return useQuery({
    queryKey: ['matchOverview', matchId],
    queryFn: () => matchService.getMatchOverview(matchId),
    enabled: !!matchId,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
