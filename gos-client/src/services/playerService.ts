import { apiClient } from '../api/apiClient';
import type {PlayerDto, PlayerEndpointParameters, PlayerField} from '../types/player';
import type {PlayerWinLossDto} from "../types/playerWinLoss.ts";
import type {PlayerTotalDto} from "../types/playerStats.ts";
import type {PlayerWordCloudDto} from "../types/wordcloud.ts";
import type {PlayerHistogramDto} from "../types/playerHistogram.ts";
import type {PlayerHeroDto} from "../types/playerHero.ts";

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

  getPlayerWordCloud: async (accountId: number, params?: PlayerEndpointParameters): Promise<PlayerWordCloudDto> => {
    return apiClient.get(`/players/${accountId}/wordcloud`, { params });
  },

  getPlayerHistograms: async (accountId: number, field: PlayerField, params?: PlayerEndpointParameters): Promise<PlayerHistogramDto[]> => {
    return apiClient.get(`/players/${accountId}/histograms/${field}`, { params });
  },

  getPlayerHeroes: async (accountId: number, params?: PlayerEndpointParameters): Promise<PlayerHeroDto[]> => {
      return apiClient.get(`/players/${accountId}/heroes`, { params });
  },
};
