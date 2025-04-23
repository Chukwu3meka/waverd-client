import { Store } from "./app.store";
import { StateCreator } from "zustand";
import { INIT_PROFILE } from "@lib/constants";

export interface AuthSlice {
  removeProfile: () => void;
  setProfile: (data: Profile) => void;
  setTheme: (data: Theme) => void;
  profile: Profile & { authenticated: boolean };
}

const createAuthSlice: StateCreator<Store, [["zustand/devtools", never]], [], AuthSlice> = (set) => ({
  profile: { ...INIT_PROFILE, authenticated: false },
  setTheme: (data) => set((state) => ({ profile: { ...state.profile, theme: data } }), undefined, "profile/setTheme"),
  setProfile: (data) => set(() => ({ profile: { ...data, authenticated: true } }), undefined, "profile/setProfile"),
  removeProfile: () => set(() => ({ profile: { ...INIT_PROFILE, authenticated: false } }), undefined, "profile/setProfile"),
});

export default createAuthSlice;
