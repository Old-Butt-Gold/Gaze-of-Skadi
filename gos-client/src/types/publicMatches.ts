import {type BaseEnum, BooleanState, Rank, GameMode, LobbyType } from './common';

export interface PublicMatchDto {
  direTeam: number[];
  radiantTeam: number[];
  avgRankTier: BaseEnum<Rank>;
  gameMode: BaseEnum<GameMode>;
  lobbyType: BaseEnum<LobbyType>;
  radiantWin: BaseEnum<BooleanState>;
  duration: number;
  startTime: number;
  matchId: number;
}

export interface PublicMatchesParams {
  lessThanMatchId?: number | null;
  minRank?: number | null;
  maxRank?: number | null;
}
