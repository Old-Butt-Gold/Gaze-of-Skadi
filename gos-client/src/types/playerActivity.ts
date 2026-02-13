import {type BaseEnum, BooleanState, type GameMode, LeaverStatus, type LobbyType, type Rank} from './common';

export interface WinLossStats {
  wins: number;
  losses: number;
  winRate: number;
}

export interface ActivityMatchDto {
  matchId: number;
  heroId: number;
  duration: number;
  startTime: number;
  leaverStatus: BaseEnum<LeaverStatus>;
  heroVariant: number | null;
  partySize: number | null;
  isMatchParsed: BaseEnum<BooleanState>;
  isRadiant: BaseEnum<BooleanState>;
  radiantWin: BaseEnum<BooleanState> | null;
  gameMode: BaseEnum<GameMode>;
  lobbyType: BaseEnum<LobbyType>;
  averageRank: BaseEnum<Rank> | null;
}

export interface ActivityStatsDto {
  overall: WinLossStats;
  byHour: Record<number, WinLossStats>;
  byDayOfWeek: Record<number, WinLossStats>;
  byMonth: Record<number, WinLossStats>;
  byYear: Record<number, WinLossStats>;
}

export interface PlayerActivityDto {
  matchesByDay: Record<string, ActivityMatchDto[]>; // DateOnly comes as string "yyyy-mm-dd"
  stats: ActivityStatsDto;
  firstMatchStartTime: number;
}
