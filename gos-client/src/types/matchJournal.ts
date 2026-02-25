import type {BaseEnum, TeamEnum} from "./common";
import type {Rune} from "./matchObjectvies.ts";

export const ConnectionEventType = {
  Connected: 0,
  Disconnected: 1,
  Abandoned: 2
} as const;

export type ConnectionEventType = typeof ConnectionEventType[keyof typeof ConnectionEventType];

export const ObjectiveType = {
  BuildingKill: 0,
  ChatMessageFirstBlood: 1,
  ChatMessageRoshanKill: 2,
  ChatMessageAegis: 3,
  ChatMessageCourierLost: 4,
  ChatMessageAegisStolen: 5,
  ChatMessageTormentorKill: 6,
} as const;

export type ObjectiveType = typeof ObjectiveType[keyof typeof ObjectiveType];

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

export interface ObjectiveEventDto extends ITimebleDto {
  type: BaseEnum<ObjectiveType>;
  playerIndex: number | null;
  target: string | null;
  targetTeam: BaseEnum<TeamEnum> | null;
}

export interface MatchJournalDto {
  objectives: ObjectiveEventDto[];
  buybacks: BuybackEventDto[];
  connections: ConnectionEventDto[];
  kills: KillEventDto[];
  runes: RuneEventDto[];
}

export type JournalEventType = 'kill' | 'buyback' | 'rune' | 'connection' | 'objective';

export interface UnifiedJournalEvent {
  id: string;
  type: JournalEventType;
  time: number;
  data: BuybackEventDto | ConnectionEventDto | KillEventDto | RuneEventDto | ObjectiveEventDto;
}
