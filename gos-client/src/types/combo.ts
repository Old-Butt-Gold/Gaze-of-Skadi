import {type BaseEnum, BooleanState } from './common';

export interface MatchFindDto {
    matchId: number;
    teamA: number[]; // Radiant Heroes IDs
    teamB: number[]; // Dire Heroes IDs
    radiantWin: BaseEnum<BooleanState>;
    startTime: number;
}

export interface FindMatchesParams {
    teamA: number[];
    teamB: number[];
}