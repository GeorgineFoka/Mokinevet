import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      // Actions
      setUser: (userData) => set({ user: userData }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "user-storage", // clé de stockage dans AsyncStorage
      storage: createJSONStorage(() => AsyncStorage), // ✅ version correcte pour RN
    }
  )
);
