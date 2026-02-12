import type {BaseEnum, BooleanState, GameMode, LeaverStatus, LobbyType, Rank} from "./common.ts";

export interface PlayerRecordDto {
  matchId: number;
  isParsedMatch: BaseEnum<BooleanState>;
  averageRank: BaseEnum<Rank> | null;
  isRadiant: BaseEnum<BooleanState>;
  radiantWin: BaseEnum<BooleanState>;
  gameMode: BaseEnum<GameMode>;
  lobbyType: BaseEnum<LobbyType>;
  heroId: number;
  startTime: number;
  leaverStatus: BaseEnum<LeaverStatus>;
  heroVariant: number | null;
  partySize: number | null;
  recordField: number;
}
