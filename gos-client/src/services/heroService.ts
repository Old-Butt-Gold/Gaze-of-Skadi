import { apiClient } from '../api/apiClient';
import type { HeroDictionary } from '../types/heroes';
import type {HeroStatsGroupedDto} from "../types/heroStats.ts";
import type {HeroBenchmarkDto} from "../types/heroBenchmarks.ts";

export const heroService = {
  getHeroes: async (): Promise<HeroDictionary> => {
    return apiClient.get('/heroes');
  },

  getHeroStats: async (): Promise<HeroStatsGroupedDto[]> => {
    return apiClient.get('/heroes/stats');
  },

  getHeroBenchmarks: async (heroId: number): Promise<HeroBenchmarkDto> => {
    return apiClient.get(`/heroes/${heroId}/benchmark`);
  }
};
