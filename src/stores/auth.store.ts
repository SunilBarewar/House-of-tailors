import { create } from "zustand";

interface AuthStore {
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,

  login: (newToken) => set({ token: newToken }),

  logout: () => set({ token: null }),
}));
