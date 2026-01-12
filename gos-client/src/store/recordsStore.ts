// store/recordsStore.ts
import { create } from 'zustand';
import type {RecordField} from '../types/records';

interface RecordsState {
  activeCategory: RecordField;
  setActiveCategory: (category: RecordField) => void;
}

export const useRecordsStore = create<RecordsState>((set) => ({
  activeCategory: 'Duration',
  setActiveCategory: (category) => set({ activeCategory: category }),
}));
