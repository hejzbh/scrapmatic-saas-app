import { create } from "zustand";

export type ModalName = "createWorkflow" | "editWorkflow";
export type ModalData = Record<string, unknown> | undefined;

export interface ModalType {
  name: ModalName;
  data?: ModalData;
}
interface ModalStoreInterface {
  modals: ModalType[];
  openModal: (modalName: ModalName, data?: Record<string, unknown>) => void;
  closeModal: (modalName: ModalName, data?: Record<string, unknown>) => void;
  closeLastModal: () => void;
  closeAllModals: () => void;
}

export const useModals = create<ModalStoreInterface>((set) => ({
  modals: [],
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
