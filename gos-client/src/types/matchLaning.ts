export interface LanePositionDto {
    x: number;
    y: number;
    count: number;
}

export interface LaneCreepsPerMinuteDto {
    minute: number;
    totalCreeps: number;
}

export interface PlayerLaneDto {
    playerIndex: number;
    laneEfficiency: number;
    lastHitsAt10Minutes: number;
    deniesAt10Minutes: number;
    lastHitsAndDeniesPerMinute: LaneCreepsPerMinuteDto[];
    lanePositions: LanePositionDto[];
}