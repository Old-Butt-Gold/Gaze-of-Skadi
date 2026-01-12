export interface BaseEnum<T> {
  value: T;
  name: string;
}

export const BooleanState = {
  False: 0,
  True: 1,
} as const;

export type BooleanState = typeof BooleanState[keyof typeof BooleanState];
