// SelectedDevice.ts
import create from 'zustand';

interface isDeviceAddedState {
    isDeviceAdded: boolean;
    setIsDeviceAdded: (isDeviceAdded:boolean) => void;
}

export const useIsDeviceAdded = create<isDeviceAddedState>((set) => ({
    isDeviceAdded: false,
    setIsDeviceAdded: (isDeviceAdded: boolean) => set({ isDeviceAdded }),
}));