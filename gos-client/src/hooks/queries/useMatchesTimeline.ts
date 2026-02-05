import { useQuery } from '@tanstack/react-query';
import { stratzService } from '../../services/stratzService';

export const useMatchesTimeline = () => {
  const gameModes = useQuery({
    queryKey: ['matchesGameMode'],
    queryFn: stratzService.getMatchesByGameMode,
    staleTime: 1000 * 60 * 60 * 24, // 24 часа (данные по месяцам меняются редко)
  });

  const regions = useQuery({
    queryKey: ['matchesRegion'],
    queryFn: stratzService.getMatchesByRegion,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const ranks = useQuery({
    queryKey: ['matchesRank'],
    queryFn: () => stratzService.getMatchesByRank(),
    staleTime: 1000 * 60 * 60 * 24,
  });

  return { gameModes, regions, ranks };
};
