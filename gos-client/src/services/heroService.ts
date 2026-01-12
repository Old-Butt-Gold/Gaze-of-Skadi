import { apiClient } from '../api/apiClient';
import type { HeroDictionary } from '../types/heroes';

export const heroService = {
  getHeroes: async (): Promise<HeroDictionary> => {
    return apiClient.get('/heroes');
  },
};
