import { Store } from "./app.store";
import { StateCreator } from "zustand";
import { INIT_PROFILE } from "@lib/constants";

export interface AuthSlice {
  removeProfile: () => void;
  setProfile: (data: Profile) => void;
  profile: Profile & { authenticated: boolean };
}

const createAuthSlice: StateCreator<Store, [["zustand/devtools", never]], [], AuthSlice> = (set) => ({
  profile: { ...INIT_PROFILE, authenticated: false },
  setProfile: (data) => set(() => ({ profile: { ...data, authenticated: true } }), undefined, "profile/setProfile"),
  removeProfile: () => set(() => ({ profile: { ...INIT_PROFILE, authenticated: false } }), undefined, "profile/setProfile"),
});

export default createAuthSlice;
