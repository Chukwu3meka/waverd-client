import { create } from "zustand";

type DeviceSize = { width: number; height: number };

interface LayoutStore {
  setActiveRoute: (data: string) => void;
  setDisplayHeader: (data: boolean) => void;
  setDeviceSize: (data: DeviceSize) => void;
  data: { route: string; width: number; height: number; displayHeader: boolean };
}

const useLayoutStore = create<LayoutStore>((set) => ({
  data: { displayHeader: false, route: "/", height: 0, width: 0 },

  setDeviceSize: (data: DeviceSize) => {
    set((state) => ({ data: { ...state.data, width: data.width, height: data.height } }));
  },

  setActiveRoute: (data: string) => {
    set((state) => ({ data: { ...state.data, route: data } }));
  },

  setDisplayHeader: (data: boolean) => {
    set((state) => ({ data: { ...state.data, displayHeader: data } }));
  },
}));

export default useLayoutStore;
