export interface TeamAdvantageDto {
  minute: number;
  radiantGoldAdvantage: number;
  radiantXpAdvantage: number;
}

export interface MinuteValueDto {
  minute: number;
  value: number;
}

export interface PlayerGraphsDto {
  playerIndex: number;
  goldPerMinute: MinuteValueDto[];
  xpPerMinute: MinuteValueDto[];
  lastHitsPerMinute: MinuteValueDto[];
}

export interface MatchGraphicsDto {
  teamAdvantages: TeamAdvantageDto[];
  playerGraphs: PlayerGraphsDto[];
  throw: number | null;
  comeback: number | null;
  loss: number | null;
  stomp: number | null;
}
