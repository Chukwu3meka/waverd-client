import { Store } from "./app.store";
import { StateCreator } from "zustand";

type DeviceSize = { width: number; height: number };

export interface LayoutSlice {
  setActiveRoute: (data: string) => void;
  setDisplayHeader: (data: boolean) => void;
  setDeviceSize: (data: DeviceSize) => void;
  layout: { route: string; width: number; height: number; displayHeader: boolean };
}

const createLayoutSlice: StateCreator<Store, [["zustand/devtools", never]], [], LayoutSlice> = (set) => ({
  layout: { displayHeader: false, route: "/", height: 0, width: 0 },

  setDeviceSize: (data: DeviceSize) => {
    set((state) => ({ layout: { ...state.layout, width: data.width, height: data.height } }), undefined, "layout/setDeviceSize");
  },

  setActiveRoute: (data: string) => {
    set((state) => ({ layout: { ...state.layout, route: data } }), undefined, "layout/setActiveRoute");
  },

  setDisplayHeader: (data: boolean) => {
    set((state) => ({ layout: { ...state.layout, displayHeader: data } }), undefined, "layout/setDisplayHeader");
  },
});

export default createLayoutSlice;
