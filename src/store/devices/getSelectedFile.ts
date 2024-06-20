// SelectedDevice.ts
import create from 'zustand';
import {Device} from "../../types/Device";

interface SelectedDeviceState {
    selectedFile: any;
    setSelectedFile: (file:any) => void;
}

export const useSelectedFile = create<SelectedDeviceState>((set) => ({
    selectedFile: '',
    setSelectedFile: (file: any) => set({ selectedFile: file }),
}));