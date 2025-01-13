import { create } from "zustand";

export type InvalidInputType = {
  name: string;
  nodeId: string;
};

type Store = {
  invalidInputs: InvalidInputType[];
  setInvalidInputs: (invalidInputs: InvalidInputType[]) => void;
  clearInvalidInputs: () => void;
};

export const useInvalidInputs = create<Store>((set) => ({
  invalidInputs: [],
  setInvalidInputs: (invalidInputs) => set({ invalidInputs }),
  clearInvalidInputs: () => set({ invalidInputs: [] }),
}));
