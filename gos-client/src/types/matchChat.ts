import type {BaseEnum} from "./common.ts";

export const ChatType = {
  Chat: 0,
  ChatWheel: 1,
} as const;

export type ChatType = typeof ChatType[keyof typeof ChatType];

export interface ChatDataDto {
  time: number;
  type: BaseEnum<ChatType>;
  message: string;
  soundUrl: string | null;
  imageUrl: string | null;
}

export interface ChatMessageDto {
  playerIndex: number;
  data: ChatDataDto;
}
