import { create } from "zustand";

// A store is one shared box of data. Any component can read from it or update it.
export const useUserStore = create((set) => ({
  user: { name: "John Doe", email: "john@example.com", role: "Student" },

  // Merges the changes into the existing user
  updateUser: (updates) =>
    set((state) => ({ user: { ...state.user, ...updates } })),
}));