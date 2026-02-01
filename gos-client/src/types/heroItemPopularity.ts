export interface HeroItemPopularityDto {
  startGameItems: Record<string, number>;
  earlyGameItems: Record<string, number>;
  midGameItems: Record<string, number>;
  lateGameItems: Record<string, number>;
}
