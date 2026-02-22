export interface MaxHeroHitDto {
    maxHeroHitAbilityOrItemName: string;
    maxHeroHitHeroId: number;
    maxHeroHitValue: number;
}

export interface PerformanceDataDto {
    multiKills: number | null;
    killStreaks: number | null;
    stunsDuration: number | null;
    stacks: number | null;
    deadTime: number | null;
    purchasedTpscroll: number | null;
    buybacks: number | null;
    pings: number | null;
    maxHeroHit: MaxHeroHitDto | null;
}

export interface PlayerPerformanceDto {
    playerIndex: number;
    performance: PerformanceDataDto;
}