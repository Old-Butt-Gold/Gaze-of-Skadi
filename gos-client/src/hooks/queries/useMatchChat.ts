import { useQuery } from '@tanstack/react-query';
import { matchService } from '../../services/matchService';

export const useMatchChat = (matchId: number, isParsed: boolean) => {
  return useQuery({
    queryKey: ['matchChat', matchId],
    queryFn: () => matchService.getMatchChat(matchId),
    enabled: !!matchId && isParsed,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
