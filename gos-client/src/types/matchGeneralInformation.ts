import type {
  BaseEnum,
  BooleanState,
  PlayerSlot,
  LeaverStatus,
  LaneRole,
  Rank
} from './common';

export interface PlayerInfoDto {
  heroId: number;
  personaName: string | null;
  heroVariant: number | null;
  accountId: number | null;
  playerSlot: BaseEnum<PlayerSlot>;
  leaverStatus: BaseEnum<LeaverStatus> | null;
  laneRole: BaseEnum<LaneRole>;
  rankTier: BaseEnum<Rank> | null;
  isRadiant: BaseEnum<BooleanState>;
  partySize: number | null;
}

export interface MatchGeneralInformationDto {
  isMatchParsed: BaseEnum<BooleanState>;
  players: PlayerInfoDto[];
}
