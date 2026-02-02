import { useQuery } from '@tanstack/react-query';
import { steamService } from '../../services/steamService';
import type {SteamNewsDto} from "../../types/steam.ts";

export const useSteamNews = (count: number) => {
  return useQuery<SteamNewsDto[], Error>({
    queryKey: ['steamNews', count],
    queryFn: () => steamService.getSteamNews(count),
    staleTime: 1000 * 60 * 15,
  });
};
