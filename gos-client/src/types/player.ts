import {type BaseEnum, BooleanState, type Rank} from './common';

export interface PlayerEndpointParameters {
  limit?: number;
  offset?: number;
  win?: number; // 0 or 1
  patch?: number;
  game_mode?: number;
  lobby_type?: number;
  region?: number;
  date?: number;
  lane_role?: number;
  hero_id?: number;
  is_radiant?: number; // 0 or 1
  included_account_ids?: number[];
  excluded_account_ids?: number[];
  with_hero_ids?: number[];
  against_hero_ids?: number[];
  significant?: number;
  having?: number;
  sort?: string;
}

export interface AliasDto {
  personaName: string;
  nameSince: number;
}

export interface ProfileInfoDto {
  accountId: number;
  personaName: string;
  name: string | null;
  plus: BaseEnum<BooleanState> | null;
  avatarFull: string | null;
  fhUnavailable: BaseEnum<BooleanState> | null;
  profileUrl: string | null;
}

export interface PlayerDto {
  rankTier: BaseEnum<Rank> | null;
  leaderboardRank: number | null;
  profile: ProfileInfoDto;
  aliases: AliasDto[];
}
