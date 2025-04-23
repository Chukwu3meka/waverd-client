import { create } from "zustand";
import { devtools } from "zustand/middleware";
import createAuthSlice, { AuthSlice } from "./auth.slice";
import createLayoutSlice, { LayoutSlice } from "./layout.slice";

export type Store = AuthSlice & LayoutSlice;

export const useAppStore = create<Store>()(
  devtools((...args) => ({
    ...createAuthSlice(...args),
    ...createLayoutSlice(...args),
  }))
);
