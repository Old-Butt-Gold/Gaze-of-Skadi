import {apiClient} from "../api/apiClient.ts";
import type {ChatMessageDto} from "../types/matchChat.ts";
import type {MatchPlayerInformationDto} from "../types/matchPlayers.ts";
import type {PlayerCosmeticsDto} from "../types/matchCosmetics.ts";
import type {PlayerActionsDto} from "../types/matchActions.ts";
import type {PlayerItemsDto} from "../types/matchItems.ts";
import type {PlayerBenchmarkDto} from "../types/matchBenchmarks.ts";

export const matchService = {
  getMatchPlayers: async (matchId: number): Promise<MatchPlayerInformationDto> => {
    return apiClient.get(`/Matches/${matchId}/players`);
  },

  getMatchChat: async (matchId: number): Promise<ChatMessageDto[]> => {
    return apiClient.get(`/Matches/${matchId}/chat`);
  },

  getMatchCosmetics: async (matchId: number): Promise<PlayerCosmeticsDto[]> => {
    return apiClient.get(`/Matches/${matchId}/cosmetics`);
  },

  getMatchActions: async (matchId: number): Promise<PlayerActionsDto[]> => {
    return apiClient.get(`/Matches/${matchId}/actions`);
  },

  getMatchItems: async (matchId: number): Promise<PlayerItemsDto[]> => {
    return apiClient.get(`/Matches/${matchId}/items`);
  },

  getMatchBenchmarks: async (matchId: number): Promise<PlayerBenchmarkDto[]> => {
    return apiClient.get(`/Matches/${matchId}/benchmarks`);
  },

};
