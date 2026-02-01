import { apiClient } from '../api/apiClient';
import type { HeroDictionary } from '../types/heroes';
import type {HeroStatsGroupedDto} from "../types/heroStats.ts";
import type {HeroBenchmarkDto} from "../types/heroBenchmarks.ts";
import type {HeroRankingDto} from "../types/heroRankings.ts";
import type {HeroMatchupDto} from "../types/heroMatchups.ts";
import type {HeroItemPopularityDto} from "../types/heroItemPopularity.ts";

export const heroService = {
  getHeroes: async (): Promise<HeroDictionary> => {
    return apiClient.get('/heroes');
  },

  getHeroStats: async (): Promise<HeroStatsGroupedDto[]> => {
    return apiClient.get('/heroes/stats');
  },

  getHeroBenchmarks: async (heroId: number): Promise<HeroBenchmarkDto> => {
    return apiClient.get(`/heroes/${heroId}/benchmark`);
  },

  getHeroRankings: async (heroId: number): Promise<HeroRankingDto> => {
    return apiClient.get(`/heroes/${heroId}/rankings`);
  },

  getHeroMatchups: async (heroId: number): Promise<HeroMatchupDto[]> => {
    return apiClient.get(`/heroes/${heroId}/matchups`);
  },

  getHeroItemPopularity: async (heroId: number): Promise<HeroItemPopularityDto> => {
    return apiClient.get(`/heroes/${heroId}/item-popularity`);
  },
};
