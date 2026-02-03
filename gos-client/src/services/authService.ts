import type {AuthStatusDto, UserProfile} from "../types/auth.ts";
import {apiClient} from "../api/apiClient.ts";

export const authService = {
  getMe: async (): Promise<UserProfile> => {
    return apiClient.get('/auth/me');
  },

  getStatus: async (): Promise<AuthStatusDto> => {
    return apiClient.get('/auth/status');
  },

  logout: async (): Promise<void> => {
    return apiClient.get('/auth/logout');
  }
};
