import { apiClient } from '../api/apiClient';
import type {PlayersQueueDto} from "../types/playersQueue.ts";
import type {HeroesMetaDto} from "../types/heroesMeta.ts";
import type {HeroMetaTimelineDto} from "../types/heroMetaTimeline.ts";

export const stratzService = {
  getPlayersQueueHistory: async (): Promise<PlayersQueueDto[]> => {
    return apiClient.get('/stratz/players-queue');
  },

  getHeroesMeta: async (): Promise<HeroesMetaDto> => {
    return apiClient.get('/stratz/heroes-meta');
  },

  getHeroMetaTimeline: async (heroId: number): Promise<HeroMetaTimelineDto> => {
    return apiClient.get(`/stratz/heroes-meta/${heroId}`);
  }
};
