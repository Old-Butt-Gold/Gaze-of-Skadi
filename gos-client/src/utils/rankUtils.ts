import type { Rank } from "../types/common.ts";

const TIER_TO_NAME: Record<number, string> = {
  1: "Herald",
  2: "Guardian",
  3: "Crusader",
  4: "Archon",
  5: "Legend",
  6: "Ancient",
  7: "Divine",
  8: "Immortal",
};

export const getRankColor = (rankValue: number): string => {
  const tier = Math.floor(rankValue / 10);
  switch (tier) {
    case 1: return 'rgb(98, 162, 52)';   // Herald
    case 2: return 'rgb(139, 94, 39)';   // Guardian
    case 3: return 'rgb(19, 115, 134)';  // Crusader
    case 4: return 'rgb(32, 177, 155)';  // Archon
    case 5: return 'rgb(179, 30, 70)';   // Legend
    case 6: return 'rgb(150, 77, 179)';  // Ancient
    case 7: return 'rgb(104, 122, 202)'; // Divine
    case 8: return 'rgb(230, 77, 26)';   // Immortal
    default: return '#cbd5e1';
  }
};

export const getRankIconUrl = (rankValue: Rank): string => {
  const iconId = Math.floor(rankValue / 10);
  return `/assets/images/rank_icon_${iconId}.png`;
};

export const getRankStarUrl = (rankValue: Rank): string | null => {
  if (rankValue >= 80) return null;
  const stars = rankValue % 10;
  return stars > 0 ? `/assets/images/rank_star_${stars}.png` : null;
};

export const getRankNameBase = (rankValue: Rank): string => {
  const tier = Math.floor(rankValue / 10);
  return TIER_TO_NAME[tier] ?? "Unknown";
};

export const getRankNameFull = (rankValue: Rank): string => {
  if (rankValue >= 80) {
    return getRankNameBase(rankValue); // "Immortal"
  }
  const baseName = getRankNameBase(rankValue);
  const stars = rankValue % 10;
  return `${baseName} ${stars}`;
};
