import { apiClient } from '../api/apiClient';
import type {PlayersQueueDto} from "../types/playersQueue.ts";

export const stratzService = {
  getPlayersQueueHistory: async (): Promise<PlayersQueueDto[]> => {
    return apiClient.get('/stratz/players-regions');
  }
};
