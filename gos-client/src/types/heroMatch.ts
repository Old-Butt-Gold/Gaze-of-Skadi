import {type BaseEnum, BooleanState } from './common';

export interface HeroMatchDto {
  matchId: number;
  startTime: number;
  duration: number;
  radiantWin: BaseEnum<BooleanState>;
  leagueId: number;
  leagueName: string;
  isRadiant: BaseEnum<BooleanState>;
  accountId: number;
  kills: number;
  deaths: number;
  assists: number;
}
