import { type BaseEnum, BooleanState } from './common';

export interface PlayerProDto {
  accountId: number;
  name: string;
  teamName: string | null;
  avatarFull: string | null;
  personaName: string;
  plus: BaseEnum<BooleanState>;
  lastPlayed: number;
  games: number;
  withWin: number;
  withGames: number;
  againstWin: number;
  againstGames: number;
}
