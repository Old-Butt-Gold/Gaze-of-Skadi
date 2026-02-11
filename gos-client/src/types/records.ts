export const RecordField = {
  Duration: 0,
  Kills: 1,
  Deaths: 2,
  Assists: 3,
  GoldPerMin: 4,
  XpPerMin: 5,
  LastHits: 6,
  Denies: 7,
  HeroDamage: 8,
  TowerDamage: 9,
  HeroHealing: 10,
} as const;

export type RecordField = typeof RecordField[keyof typeof RecordField];

export interface RecordDto {
  matchId: number;
  startTime: number; // Unix timestamp in seconds
  heroId: number | null;
  score: number;
}

// Map using the numeric values
export const RECORD_CATEGORIES: Record<RecordField, { label: string; format: 'number' | 'duration' }> = {
  [RecordField.Duration]: { label: 'Duration', format: 'duration' },
  [RecordField.Kills]: { label: 'Kills', format: 'number' },
  [RecordField.Deaths]: { label: 'Deaths', format: 'number' },
  [RecordField.Assists]: { label: 'Assists', format: 'number' },
  [RecordField.GoldPerMin]: { label: 'Gold/min', format: 'number' },
  [RecordField.XpPerMin]: { label: 'XP/min', format: 'number' },
  [RecordField.LastHits]: { label: 'Last Hits', format: 'number' },
  [RecordField.Denies]: { label: 'Denies', format: 'number' },
  [RecordField.HeroDamage]: { label: 'Hero Damage', format: 'number' },
  [RecordField.TowerDamage]: { label: 'Tower Damage', format: 'number' },
  [RecordField.HeroHealing]: { label: 'Hero Healing', format: 'number' },
} as const;
