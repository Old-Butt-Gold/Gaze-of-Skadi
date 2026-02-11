import type {GameMode, LaneRole, LeaverStatus, LobbyType, Patch, Region, TeamEnum} from "./common.ts";

export interface PlayerCountStats {
  games: number;
  win: number;
}

export interface PlayerCountDto {
  leaverStatus: Record<LeaverStatus, PlayerCountStats>;
  gameMode: Record<GameMode, PlayerCountStats>;
  lobbyType: Record<LobbyType, PlayerCountStats>;
  laneRole: Record<LaneRole, PlayerCountStats>;
  region: Record<Region, PlayerCountStats>;
  patch: Record<Patch, PlayerCountStats>;
  isRadiant: Record<TeamEnum, PlayerCountStats>;
}
