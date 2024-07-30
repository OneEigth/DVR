import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Device } from "../../types/Device";

interface SelectedDeviceState {
    selectedDevice: Device | null;
    setSelectedDevice: (device: Device) => void;
}

export const useSelectedDevice = create<SelectedDeviceState>()(
    persist(
        (set) => ({
            selectedDevice: null,
            setSelectedDevice: (device: Device) => {
                console.log('Setting selected device:', device);
                set({ selectedDevice: device });
            },
        }),
        {
            name: 'selected-device-storage',
            getStorage: () => localStorage,
        }
    )
);
