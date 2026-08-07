import { create } from 'zustand';

interface HomeSelectedDateStoreTypes {
  selectedDate: string | null;
  setSelectedDate: (selectedDate: string) => void;
}

export const useHomeSelectedDateStore = create<HomeSelectedDateStoreTypes>(
  (set) => ({
    selectedDate: null,
    setSelectedDate: (selectedDate) => set({ selectedDate }),
  }),
);
