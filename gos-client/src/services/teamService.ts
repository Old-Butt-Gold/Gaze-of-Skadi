import { apiClient } from '../api/apiClient';
import type {TeamDto, TeamHeroDto, TeamMatchDto, TeamPlayerDto} from '../types/teams';

export const teamService = {
  getAllTeams: async (): Promise<TeamDto[]> => {
    return apiClient.get('/Team');
  },

  getTeamById: async (teamId: number): Promise<TeamDto> => {
    return apiClient.get(`/Team/${teamId}`);
  },

  getTeamMatches: async (teamId: number): Promise<TeamMatchDto[]> => {
    return apiClient.get(`/Team/${teamId}/matches`);
  },

  getTeamPlayers: async (teamId: number): Promise<TeamPlayerDto[]> => {
    return apiClient.get(`/Team/${teamId}/players`);
  },

  getTeamHeroes: async (teamId: number): Promise<TeamHeroDto[]> => {
    return apiClient.get(`/Team/${teamId}/heroes`);
  }
};
