export interface PlayerPeerDto {
  accountId: number;
  lastPlayed: number;
  win: number;
  games: number;
  withWin: number;
  withGames: number;
  againstWin: number;
  againstGames: number;
  withGpmSum: number;
  withXpmSum: number;
  personaname: string;
  avatarFull: string | null;
}
