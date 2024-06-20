// SelectedDevice.ts
import create from 'zustand';

interface  openMoreDetailsState {
    openMoreDetails: boolean;
    setOpenMoreDetails: (openMoreDetails:boolean) => void;
}

export const useOpenMoreDetails = create<openMoreDetailsState>((set) => ({
    openMoreDetails: false,
    setOpenMoreDetails: (openMoreDetails: boolean) => set({ openMoreDetails }),
}));