import { create } from "zustand";
import { INIT_PROFILE } from "@lib/constants";

interface AuthStore {
  signout: () => void;
  signin: (data: Profile) => void;
  data: Profile & { authenticated: boolean };
}

const useAuthStore = create<AuthStore>((set) => ({
  data: { ...INIT_PROFILE, authenticated: false },

  signin: (data) => {
    set({ data: { ...data, authenticated: true } });
  },

  signout: () => {
    set({ data: { ...INIT_PROFILE, authenticated: false } });
  },
}));

export default useAuthStore;
