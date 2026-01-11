// src/types/records.ts

export const RECORD_FIELDS = [
  'Duration',
  'Kills',
  'Deaths',
  'Assists',
  'GoldPerMin',
  'XpPerMin',
  'LastHits',
  'Denies',
  'HeroDamage',
  'TowerDamage',
  'HeroHealing',
] as const;

export type RecordField = typeof RECORD_FIELDS[number];

export interface RecordDto {
  matchId: number;
  startTime: number; // Unix timestamp in seconds
  heroId: number | null;
  score: number;
}

export const RECORD_CATEGORIES: Record<RecordField, { label: string; format: 'number' | 'duration' }> = {
  Duration: { label: 'Duration', format: 'duration' },
  Kills: { label: 'Kills', format: 'number' },
  Deaths: { label: 'Deaths', format: 'number' },
  Assists: { label: 'Assists', format: 'number' },
  GoldPerMin: { label: 'Gold/min', format: 'number' },
  XpPerMin: { label: 'XP/min', format: 'number' },
  LastHits: { label: 'Last Hits', format: 'number' },
  Denies: { label: 'Denies', format: 'number' },
  HeroDamage: { label: 'Hero Damage', format: 'number' },
  TowerDamage: { label: 'Tower Damage', format: 'number' },
  HeroHealing: { label: 'Hero Healing', format: 'number' },
} as const;
