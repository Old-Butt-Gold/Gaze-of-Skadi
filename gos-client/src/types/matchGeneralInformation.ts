import type {
  BaseEnum,
  BooleanState,
  PlayerSlot,
  LeaverStatus,
  LaneRole,
  Rank, TeamEnum, GameMode, LobbyType, Region, Patch
} from './common';

export interface PlayerInfoDto {
  heroId: number;
  name: string | null;
  personaName: string | null;
  heroVariant: number | null;
  accountId: number | null;
  playerSlot: BaseEnum<PlayerSlot>;
  leaverStatus: BaseEnum<LeaverStatus> | null;
  laneRole: BaseEnum<LaneRole>;
  rankTier: BaseEnum<Rank> | null;
  isRadiant: BaseEnum<BooleanState>;
  partySize: number | null;
}

export interface MatchGeneralInformationDto {
  isMatchParsed: BaseEnum<BooleanState>;
  players: PlayerInfoDto[];
  matchGeneral: MatchHeaderInformationDto;
}

export const Tier = {
  None: 0,
  Amateur: 1,
  Excluded: 2,
  Premium: 3,
  Professional: 4,
} as const;

export type Tier = typeof Tier[keyof typeof Tier];

export interface LeagueDto {
  leagueId: number;
  tier: BaseEnum<Tier> | null;
  name: string;
}

export interface MatchTeamDto {
  teamId: number;
  name: string;
  logoUrl: string | null;
}

export interface MatchHeaderInformationDto {
  matchId: number;
  winner: BaseEnum<TeamEnum>;
  radiantScore: number;
  direScore: number;
  gameMode: BaseEnum<GameMode>;
  lobbyType: BaseEnum<LobbyType>;
  duration: number;
  startTime: number;
  region: BaseEnum<Region>;
  patch: BaseEnum<Patch>;
  replayUrl: string | null;
  radiantTeam: MatchTeamDto | null;
  direTeam: MatchTeamDto | null;
  league: LeagueDto | null;
}
