import { apiClient } from '../api/apiClient';
import type {PlayerDto, PlayerEndpointParameters, PlayerField} from '../types/player';
import type {PlayerWinLossDto} from "../types/playerWinLoss.ts";
import type {PlayerTotalDto} from "../types/playerStats.ts";
import type {PlayerWordCloudDto} from "../types/wordcloud.ts";
import type {PlayerHistogramDto} from "../types/playerHistogram.ts";
import type {PlayerHeroDto} from "../types/playerHero.ts";
import type {PlayerWardMapDto} from "../types/playerWardMap.ts";
import type {PlayerPeerDto} from "../types/playerPeer.ts";
import type {PlayerProDto} from "../types/playerPro.ts";

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

  getPlayerWardMap: async (accountId: number, params?: PlayerEndpointParameters): Promise<PlayerWardMapDto> => {
    return apiClient.get(`/players/${accountId}/wardmap`, { params });
  },

  getPlayerPeers: async (accountId: number, params?: PlayerEndpointParameters): Promise<PlayerPeerDto[]> => {
    return apiClient.get(`/players/${accountId}/peers`, { params });
  },

  getPlayerPros: async (accountId: number, params?: PlayerEndpointParameters): Promise<PlayerProDto[]> => {
    return apiClient.get(`/players/${accountId}/pros`, { params });
  }
};
