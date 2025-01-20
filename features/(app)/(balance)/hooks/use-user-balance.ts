import { create } from "zustand";

type Store = {
  availableCredits: number;
  areCreditsLoaded?: boolean;
  chargeCredits: (amount: number) => void;
  loadCredits: (availableCredits: number) => void;
};

export const useUserBalance = create<Store>((set) => ({
  availableCredits: 0,
  chargeCredits: (amount) =>
    set((store) => ({ availableCredits: store.availableCredits - amount })),
  loadCredits: (availableCredits) =>
    set(() => ({ availableCredits, areCreditsLoaded: true })),
}));
