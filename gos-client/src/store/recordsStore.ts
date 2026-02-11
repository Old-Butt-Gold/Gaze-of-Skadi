import { create } from 'zustand';
import {RecordField} from '../types/records';

interface RecordsState {
  activeCategory: RecordField;
  setActiveCategory: (category: RecordField) => void;
}

export const useRecordsStore = create<RecordsState>((set) => ({
  activeCategory: RecordField.Duration,
  setActiveCategory: (category) => set({ activeCategory: category }),
}));
