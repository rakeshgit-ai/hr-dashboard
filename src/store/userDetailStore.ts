import { create } from "zustand";

type UserDetailState = {
  overview: string;
  project: string;
  feedback: string;
  setOverview: (overview: string) => void;
  setProject: (project: string) => void;
  setFeedback: (feedback: string) => void;
  reset: () => void;
};

export const useUserDetailStore = create<UserDetailState>((set) => ({
  overview: "",
  project: "",
  feedback: "",
  setOverview: (overview) => set({ overview }),
  setProject: (project) => set({ project }),
  setFeedback: (feedback) => set({ feedback }),
  reset: () => set({ overview: "", project: "", feedback: "" }),
}));