import { apiClient } from '../api/apiClient';
import type { PlayerDto, PlayerEndpointParameters } from '../types/player';
import type {PlayerWinLossDto} from "../types/playerWinLoss.ts";
import type {PlayerTotalDto} from "../types/playerStats.ts";

export const playerService = {
  getPlayerById: async (accountId: number): Promise<PlayerDto> => {
    return apiClient.get(`/players/${accountId}`);
  },

  getPlayerWinLoss: async (accountId: number, params?: PlayerEndpointParameters): Promise<PlayerWinLossDto> => {
    return apiClient.get(`/players/${accountId}/wl`, { params });
  },

  getPlayerTotals: async (accountId: number, params?: PlayerEndpointParameters): Promise<PlayerTotalDto[]> => {
    return apiClient.get(`/players/${accountId}/totals`, { params });
  },
};
