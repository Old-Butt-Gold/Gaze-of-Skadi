import type {RankedStatsDto} from "../types/heroStats.ts";

export const RANK_KEYS: (keyof RankedStatsDto)[] = [
  'herald',
  'guardian',
  'crusader',
  'archon',
  'legend',
  'ancient',
  'divine'
];

export const RANK_ICON_IDS: Record<keyof Omit<RankedStatsDto, 'pub'>, number> = {
  herald: 10,
  guardian: 20,
  crusader: 30,
  archon: 40,
  legend: 50,
  ancient: 60,
  divine: 70
};

export const calculateWinRate = (wins: number, picks: number): number => {
  if (!picks || picks <= 0) return 0;
  return (wins / picks) * 100;
};

export const getWinRateColor = (winRate: number): string => {
  if (winRate >= 55) return 'text-emerald-400';
  if (winRate >= 50) return 'text-[#e7d291]';
  if (winRate >= 45) return 'text-[#808fa6]';
  return 'text-red-400';
};
