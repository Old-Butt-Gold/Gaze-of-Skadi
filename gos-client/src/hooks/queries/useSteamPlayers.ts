import { useQuery } from '@tanstack/react-query';
import { steamService } from '../../services/steamService';
import type {SteamPlayerDto} from "../../types/steam.ts";

export const useSteamPlayers = (accountIds: number[]) => {
  const uniqueIds = Array.from(new Set(accountIds)).map(String);

  return useQuery<SteamPlayerDto[], Error>({
    queryKey: ['steamPlayers', uniqueIds],
    queryFn: () => steamService.getSteamPlayers(uniqueIds),
    enabled: uniqueIds.length > 0,
    staleTime: 1000 * 60 * 60,
    placeholderData: [],
  });
};
