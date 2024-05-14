// SelectedDevice.ts
import create from 'zustand';
import {Device} from "../../types/Device";

interface SelectedDeviceState {
    selectedDevice: any;
    setSelectedDevice: (device:Device) => void;
}

export const useSelectedDevice = create<SelectedDeviceState>((set) => ({
    selectedDevice: '',
    setSelectedDevice: (device: any) => set({ selectedDevice: device }),
}));