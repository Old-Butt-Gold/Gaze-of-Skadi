import {type BaseEnum, BooleanState } from './common';

export interface ProMatchDto {
  matchId: number;
  duration: number;
  startTime: number;
  radiantImage: string;
  radiantName: string;
  direImage: string;
  direName: string;
  leagueName: string;
  leagueImageUrl: string;
  radiantScore: number;
  direScore: number;
  radiantWin: BaseEnum<BooleanState>;
}
