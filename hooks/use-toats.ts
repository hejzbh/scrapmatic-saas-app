import { create } from "zustand";

export interface ToastType {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastStore {
  toasts: ToastType[];
  addToast: (
    message: string,
    type: ToastType["type"],
    duration?: number
  ) => void;
  removeToast: (id: string) => void;
}

export const useToats = create<ToastStore>((set, get) => ({
  toasts: [],
  addToast: (message, type, duration = 5000) => {
    const id = Math.random().toString(36).substr(2, 9); // Generating a unique ID
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
    setTimeout(() => {
      get().removeToast(id);
    }, duration); // The toast is automatically removed after duration expired
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

export default useToats;
