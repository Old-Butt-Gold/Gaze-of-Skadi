import { apiClient } from '../api/apiClient';
import type {TeamDto} from '../types/teams';

export const teamService = {
  getAllTeams: async (): Promise<TeamDto[]> => {
    return apiClient.get('/Team');
  },
};
