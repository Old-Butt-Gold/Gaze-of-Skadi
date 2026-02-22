import { useQuery } from '@tanstack/react-query';
import { matchService } from '../../services/matchService';

export const useMatchGraphics = (matchId: number, isParsed: boolean) => {
  return useQuery({
    queryKey: ['matchGraphics', matchId],
    queryFn: () => matchService.getMatchGraphics(matchId),
    enabled: !!matchId && isParsed,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
