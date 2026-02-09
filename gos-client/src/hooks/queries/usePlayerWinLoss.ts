import {useQuery} from "@tanstack/react-query";
import {playerService} from "../../services/playerService.ts";
import type {PlayerEndpointParameters} from "../../types/player.ts";

export const usePlayerWinLoss = (accountId: number, params: PlayerEndpointParameters, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['player_wl', accountId, params],
    queryFn: () => playerService.getPlayerWinLoss(accountId, params),
    enabled: enabled && !!accountId && !isNaN(accountId),
    staleTime: 1000 * 60 * 5,
  });
};
