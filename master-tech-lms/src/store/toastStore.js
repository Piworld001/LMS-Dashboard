import { create } from "zustand";

let nextId = 1;

export const useToastStore = create((set) => ({
  toasts: [],

  showToast: (message) => {
    const id = nextId++;
    set((state) => ({ toasts: [...state.toasts, { id, message }] }));

    // Remove this toast after 3 seconds
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 3000);
  },
}));