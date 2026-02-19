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
  level: number;
  partyId: number | null;
  partySize: number | null;
}

export interface MatchPlayerInformationDto {
  isMatchParsed: BaseEnum<BooleanState>;
  players: PlayerInfoDto[];
}
