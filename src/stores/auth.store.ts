import { IAuthData } from "@/types/user.types";
import { create } from "zustand";

interface IAuthStore {
  user: IAuthData | null;
  login: (authData: IAuthData) => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  login: (authData: IAuthData) => set({ user: authData }),

  logout: () => set({ user: null }),
}));
