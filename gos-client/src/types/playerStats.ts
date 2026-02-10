import { type BaseEnum } from './common';
import type {PlayerField} from "./player.ts";

export interface PlayerTotalDto {
  field: BaseEnum<PlayerField>;
  sum: number;
}
