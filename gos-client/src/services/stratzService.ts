import { apiClient } from '../api/apiClient';
import type {PlayersQueueDto} from "../types/playersQueue.ts";
import type {HeroesMetaDto} from "../types/heroesMeta.ts";
import type {HeroMetaTimelineDto} from "../types/heroMetaTimeline.ts";
import type {MatchesByGameModeDto, MatchesByRankDto, MatchesByRegionDto} from "../types/matchesTimeline.ts";

export const stratzService = {
  getPlayersQueueHistory: async (): Promise<PlayersQueueDto[]> => {
    return apiClient.get('/stratz/players-queue');
  },

  getHeroesMeta: async (): Promise<HeroesMetaDto> => {
    return apiClient.get('/stratz/heroes-meta');
  },

  getHeroMetaTimeline: async (heroId: number): Promise<HeroMetaTimelineDto> => {
    return apiClient.get(`/stratz/heroes-meta/${heroId}`);
  },

  getMatchesByGameMode: async (): Promise<MatchesByGameModeDto> => {
    return apiClient.get('/stratz/matches-game-mode');
  },

  getMatchesByRegion: async (): Promise<MatchesByRegionDto> => {
    return apiClient.get('/stratz/matches-region');
  },

  getMatchesByRank: async (): Promise<MatchesByRankDto> => {
    return apiClient.get('/stratz/matches-rank');
  },
};
