import {apiClient} from "../api/apiClient.ts";
import type {ChatMessageDto} from "../types/matchChat.ts";
import type {MatchGeneralInformationDto} from "../types/matchGeneralInformation.ts";
import type {PlayerCosmeticsDto} from "../types/matchCosmetics.ts";
import type {PlayerActionsDto} from "../types/matchActions.ts";
import type {PlayerItemsDto} from "../types/matchItems.ts";
import type {PlayerBenchmarkDto} from "../types/matchBenchmarks.ts";
import type {MatchGraphicsDto} from "../types/matchGraphics.ts";
import type {PlayerPerformanceDto} from "../types/matchPerformances.ts";
import type {PlayerLaneDto} from "../types/matchLaning.ts";
import type {PlayerCastsDto} from "../types/matchCasts.ts";
import type {PlayerDamageDto} from "../types/matchDamage.ts";
import type {PlayerEarningsDto} from "../types/matchEarnings.ts";
import type {PlayerObjectivesDto} from "../types/matchObjectvies.ts";
import type {MatchVisionDto} from "../types/matchVision.ts";
import type {TeamfightDetailedDto} from "../types/matchTeamfights.ts";
import type {MatchJournalDto} from "../types/matchJournal.ts";
import type {MatchOverviewDto} from "../types/matchOverview.ts";

export const matchService = {
  getMatchGeneralInformation: async (matchId: number): Promise<MatchGeneralInformationDto> => {
    return apiClient.get(`/Matches/${matchId}/general-info`);
  },

  getMatchOverview: async (matchId: number): Promise<MatchOverviewDto> => {
    return apiClient.get(`/Matches/${matchId}/overview`);
  },

  getMatchChat: async (matchId: number): Promise<ChatMessageDto[]> => {
    return apiClient.get(`/Matches/${matchId}/chat`);
  },

  getMatchCosmetics: async (matchId: number): Promise<PlayerCosmeticsDto[]> => {
    return apiClient.get(`/Matches/${matchId}/cosmetics`);
  },

  getMatchActions: async (matchId: number): Promise<PlayerActionsDto[]> => {
    return apiClient.get(`/Matches/${matchId}/actions`);
  },

  getMatchItems: async (matchId: number): Promise<PlayerItemsDto[]> => {
    return apiClient.get(`/Matches/${matchId}/items`);
  },

  getMatchBenchmarks: async (matchId: number): Promise<PlayerBenchmarkDto[]> => {
    return apiClient.get(`/Matches/${matchId}/benchmarks`);
  },

  getMatchGraphics: async (matchId: number): Promise<MatchGraphicsDto> => {
    return apiClient.get(`/Matches/${matchId}/graphics`);
  },

  getMatchPerformances: async (matchId: number): Promise<PlayerPerformanceDto[]> => {
    return apiClient.get(`/Matches/${matchId}/performances`);
  },

  getMatchLaning: async (matchId: number): Promise<PlayerLaneDto[]> => {
      return apiClient.get(`/Matches/${matchId}/lanes`);
  },

  getMatchCasts: async (matchId: number): Promise<PlayerCastsDto[]> => {
    return apiClient.get(`/Matches/${matchId}/casts`);
  },

  getMatchDamage: async (matchId: number): Promise<PlayerDamageDto[]> => {
    return apiClient.get(`/Matches/${matchId}/damage`);
  },

  getMatchEarnings: async (matchId: number): Promise<PlayerEarningsDto[]> => {
    return apiClient.get(`/Matches/${matchId}/earnings`);
  },

  getMatchObjectives: async (matchId: number): Promise<PlayerObjectivesDto[]> => {
    return apiClient.get(`/Matches/${matchId}/objectives`);
  },

  getMatchVision: async (matchId: number): Promise<MatchVisionDto> => {
    return apiClient.get(`/Matches/${matchId}/vision`);
  },

  getMatchTeamfights: async (matchId: number): Promise<TeamfightDetailedDto[]> => {
    return apiClient.get(`/Matches/${matchId}/teamfights`);
  },

  getMatchJournal: async (matchId: number): Promise<MatchJournalDto> => {
    return apiClient.get(`/Matches/${matchId}/journal`);
  },
};
