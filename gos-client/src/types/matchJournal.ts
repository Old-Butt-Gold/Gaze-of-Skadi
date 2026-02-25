import type { BaseEnum } from "./common";
import type {Rune} from "./matchObjectvies.ts";

export const ConnectionEventType = {
  Connected: 0,
  Disconnected: 1,
  Abandoned: 2
} as const;

export type ConnectionEventType = typeof ConnectionEventType[keyof typeof ConnectionEventType];

export interface ITimebleDto {
  time: number;
}

export interface BuybackEventDto extends ITimebleDto {
  playerIndex: number;
}

export interface ConnectionEventDto extends ITimebleDto {
  event: BaseEnum<ConnectionEventType>;
  playerIndex: number;
}

export interface KillEventDto extends ITimebleDto {
  killerIndex: number;
  victimHeroId: number;
}

export interface RuneEventDto extends ITimebleDto {
  rune: BaseEnum<Rune>;
  playerIndex: number;
}

export interface MatchJournalDto {
  buybacks: BuybackEventDto[];
  connections: ConnectionEventDto[];
  kills: KillEventDto[];
  runes: RuneEventDto[];
}

export type JournalEventType = 'kill' | 'buyback' | 'rune' | 'connection';

export interface UnifiedJournalEvent {
  id: string;
  type: JournalEventType;
  time: number;
  data: BuybackEventDto | ConnectionEventDto | KillEventDto | RuneEventDto;
}
