import { useQuery } from '@tanstack/react-query';
import { matchService } from '../../services/matchService';

export const useMatchJournal = (matchId: number, isParsed: boolean) => {
  return useQuery({
    queryKey: ['matchJournal', matchId],
    queryFn: () => matchService.getMatchJournal(matchId),
    enabled: !!matchId && isParsed,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
