import { useQuery } from '@tanstack/react-query';
import { matchService } from '../../services/matchService';

export const useMatchBenchmarks = (matchId: number) => {
  return useQuery({
    queryKey: ['matchBenchmarks', matchId],
    queryFn: () => matchService.getMatchBenchmarks(matchId),
    enabled: !!matchId,
    staleTime: 1000 * 60 * 60 * 24, // 24 часа
  });
};
