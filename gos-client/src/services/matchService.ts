import {apiClient} from "../api/apiClient.ts";
import type {ChatMessageDto} from "../types/matchChat.ts";
import type {MatchPlayerInformationDto} from "../types/matchPlayers.ts";

export const matchService = {
  getMatchPlayers: async (matchId: number): Promise<MatchPlayerInformationDto> => {
    return apiClient.get(`/Matches/${matchId}/players`);
  },

  getMatchChat: async (matchId: number): Promise<ChatMessageDto[]> => {
    return apiClient.get(`/Matches/${matchId}/chat`);
  },
};
