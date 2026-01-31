import { apiClient } from '../api/apiClient';
import type { HeroDictionary } from '../types/heroes';
import type {HeroStatsGroupedDto} from "../types/heroStats.ts";

export const heroService = {
  getHeroes: async (): Promise<HeroDictionary> => {
    return apiClient.get('/heroes');
  },

  getHeroStats: async (): Promise<HeroStatsGroupedDto[]> => {
    return apiClient.get('/heroes/stats');
  },
};
