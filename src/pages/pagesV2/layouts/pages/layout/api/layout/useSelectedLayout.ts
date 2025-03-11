// selectedLayout.ts
import create from 'zustand';

interface SelectedLayoutState {
    selectedLayout: any;
    setSelectedLayout: (layout:any) => void;
}

export const useSelectedLayout = create<SelectedLayoutState>((set) => ({
    selectedLayout: '',
    setSelectedLayout: (layout: any) => set({ selectedLayout: layout }),
}));