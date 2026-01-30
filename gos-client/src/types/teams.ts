import type {BaseEnum, BooleanState} from "./common.ts";

export interface TeamDto {
  teamId: number;
  tag: string;
  name: string;
  lastMatchTime: number; // Unix timestamp
  losses: number;
  wins: number;
  rating: number;
  logoUrl: string | null;
}

export interface TeamMatchDto {
  matchId: number;
  radiantWin: BaseEnum<BooleanState>;
  radiantScore: number;
  direScore: number;
  radiant: BaseEnum<BooleanState>
  duration: number;
  startTime: number;
  leagueId: number;
  leagueImageUrl: string;
  leagueName: string | null;
  opposingTeamId: number;
  opposingTeamName: string | null;
  opposingTeamLogo: string | null;
}

export interface TeamPlayerDto {
  accountId: number;
  name: string | null;
  gamesPlayed: number;
  wins: number;
  isCurrentTeamMember: BaseEnum<BooleanState> | null;
  imageUrl: string;
}

export interface TeamHeroDto {
  heroId: number;
  gamesPlayed: number;
  wins: number;
}
