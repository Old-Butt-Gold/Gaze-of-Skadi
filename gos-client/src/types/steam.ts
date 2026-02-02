export interface SteamPlayerDto {
  steamId32: string;
  steamName: string | null;
  avatar: string | null;
}

export interface SteamNewsDto {
  author: string;
  date: number; // Unix timestamp
  title: string;
  url: string;
}
