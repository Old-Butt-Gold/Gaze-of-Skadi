import type {BaseEnum, BooleanState, GameMode, LaneRole, LeaverStatus, LobbyType, PlayerSlot, Rank} from './common';

export interface PlayerMatchHeroDto {
  heroId: number;
}

export interface PlayerMatchDto {
  matchId: number;
  isMatchParsed: BaseEnum<BooleanState>;
  isRadiant: BaseEnum<BooleanState>;
  radiantWin: BaseEnum<BooleanState> | null;
  duration: number;
  gameMode: BaseEnum<GameMode>;
  lobbyType: BaseEnum<LobbyType>;
  averageRank: BaseEnum<Rank> | null;
  heroId: number;
  startTime: number;
  kills: number;
  deaths: number;
  assists: number;
  leaverStatus: BaseEnum<LeaverStatus>;

  level: number | null;
  heroVariant: number | null;
  partySize: number | null;


  item0: number | null;
  item1: number | null;
  item2: number | null;
  item3: number | null;
  item4: number | null;
  item5: number | null;

  heroes: Record<PlayerSlot, PlayerMatchHeroDto> | null;

  lane: BaseEnum<LaneRole> | null;
}
