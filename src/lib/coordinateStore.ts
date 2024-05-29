import { create } from "zustand";

interface CoordinateState {
  coordinate: {
    lon: number,
    lat: number
  } | null;
  setCenterCoordinate: (coor: { lon: number, lat: number }) => void;
}

export const useCoordinateStore = create<CoordinateState>((set) => ({
  coordinate: null,
  setCenterCoordinate: (coor: { lon: number, lat: number }) => set({ coordinate: coor }),
}));
