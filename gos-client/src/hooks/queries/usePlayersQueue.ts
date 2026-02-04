import { useQuery } from '@tanstack/react-query';
import { stratzService } from '../../services/stratzService';
import type {PlayersQueueDto} from "../../types/playersQueue.ts";

export const usePlayersQueue = () => {
  return useQuery<PlayersQueueDto[], Error>({
    queryKey: ['playersQueue'],
    queryFn: stratzService.getPlayersQueueHistory,
    staleTime: 1000 * 60 * 10, // 10 минут
  });
};
