export interface AuthStatusDto {
  isAuthenticated: boolean;
}

export interface UserProfile {
  steam_id64: string;
  steam_id32: string;
  steam_steamname: string;
  steam_profileurl: string;
  steam_avatar: string;
  steam_avatarmedium: string;
  steam_avatarfull: string;
  steam_realname: string;
}
