import {type BaseEnum, BooleanState } from './common';

export interface PlayerResponseDto {
  lastMatchTime: number | null;
  avatarFull: string | null;
  personaName: string;
  accountId: number;
}

export interface ProPlayerDto {
  accountId: number;
  avatar: string | null;
  profileUrl: string | null;
  personaName: string | null;
  lastMatchTime: number | null;
  name: string; // Official Pro Name (e.g. "Dendi")
  teamName: string | null;
  haveDotaPlus: BaseEnum<BooleanState> | null;
}
