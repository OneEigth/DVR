import create from 'zustand';

interface MapState {
    map: any;
    position: { lat: number; lng: number };
    setPosition: (position: { lat: number; lng: number }) => void;
}

export const useMapStore = create<MapState>((set) => ({
    map: null,
    position: { lat: 0, lng: 0 },
    setPosition: (position) => set({ position }),
}));