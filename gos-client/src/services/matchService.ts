import {apiClient} from "../api/apiClient.ts";
import type {PlayerDto} from "../types/player.ts";

export const matchService = {
  getMatchPlayers: async (matchId: number): Promise<PlayerDto> => {
    return apiClient.get(`/Matches/${matchId}/players`);
  },
};
