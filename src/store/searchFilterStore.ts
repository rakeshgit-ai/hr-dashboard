import { create } from "zustand";

type SearchFilterStore = {
  search: string;
  setSearch: (v: string) => void;
  selectedDepartments: string[];
  setSelectedDepartments: (v: string[]) => void;
  selectedRatings: number[];
  setSelectedRatings: (v: number[]) => void;
  resetFilters: () => void;
};

export const useSearchFilterStore = create<SearchFilterStore>((set) => ({
  search: "",
  setSearch: (v) => set({ search: v }),
  selectedDepartments: [],
  setSelectedDepartments: (v) => set({ selectedDepartments: v }),
  selectedRatings: [],
  setSelectedRatings: (v) => set({ selectedRatings: v }),
  resetFilters: () =>
    set({ search: "", selectedDepartments: [], selectedRatings: [] }),
}));