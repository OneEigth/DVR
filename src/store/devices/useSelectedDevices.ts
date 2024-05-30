
import create from 'zustand';

interface SelectedDeviceCountState {
    selectedDeviceCount: any;
    setSelectedDeviceCount: (selectedDeviceCount:any) => void;
}

export const useSelectedDeviceCount = create<SelectedDeviceCountState>((set) => ({
    selectedDeviceCount: '',
    setSelectedDeviceCount: (selectedDeviceCount: any) => set({ selectedDeviceCount: selectedDeviceCount }),
}));