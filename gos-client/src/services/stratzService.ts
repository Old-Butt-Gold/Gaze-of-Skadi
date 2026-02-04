import { apiClient } from '../api/apiClient';
import type {PlayersQueueDto} from "../types/playersQueue.ts";
import type {HeroesMetaDto} from "../types/heroesMeta.ts";

export const stratzService = {
  getPlayersQueueHistory: async (): Promise<PlayersQueueDto[]> => {
    return apiClient.get('/stratz/players-queue');
  },

  getHeroesMeta: async (): Promise<HeroesMetaDto> => {
    return apiClient.get('/stratz/heroes-meta');
  }
};
