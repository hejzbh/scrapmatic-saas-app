import { Workflow } from "@prisma/client";
import { create } from "zustand";

export type ModalName = "createWorkflow" | "editWorkflow" | "deleteWorkflow";
export type ModalData = Record<string, Workflow> | undefined;

export interface ModalType {
  name: ModalName;
  data?: ModalData;
}
interface ModalStoreInterface {
  modals: ModalType[];
  getModalInfo: (modalName: ModalName) => ModalType | undefined;
  openModal: (modalName: ModalName, data?: ModalData) => void;
  closeModal: (modalName: ModalName, data?: ModalData) => void;
  closeLastModal: () => void;
  closeAllModals: () => void;
}

export const useModals = create<ModalStoreInterface>((set, get) => ({
  modals: [],
  getModalInfo: (modalName) =>
    get().modals.find((modal) => modal.name === modalName),
  openModal: (modalName, data) => {
    set((store) => {
      // If modal is already opened
      if (
        store.modals.some((existingModal) => existingModal.name === modalName)
      ) {
        return store;
      }

      // Add new modal
      return { modals: [...store.modals, { name: modalName, data }] };
    });
  },
  closeModal: (modalName) => {
    set((state) => ({
      modals: state.modals.filter((modal) => modal.name !== modalName), // Remove modal from the list
    }));
  },
  closeLastModal: () => set((store) => ({ modals: store.modals.slice(0, -1) })),
  closeAllModals: () => set({ modals: [] }),
}));
