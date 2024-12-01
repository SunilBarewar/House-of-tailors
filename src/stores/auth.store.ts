import { IAuthData } from "@/types/user.types";
import { create } from "zustand";
import { persist, PersistStorage, StorageValue } from "zustand/middleware";

interface IAuthStore {
  user: IAuthData | null;
  login: (authData: IAuthData) => void;
  logout: () => void;
}

const storage: PersistStorage<IAuthStore> = {
  getItem: (key: string) => {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as StorageValue<IAuthStore>) : null;
  },
  setItem: (key: string, value: StorageValue<IAuthStore>) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    window.localStorage.removeItem(key);
  },
};

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      user: null,
      login: (authData: IAuthData) => set({ user: authData }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-store", // Key for localStorage
      storage,
    }
  )
);
