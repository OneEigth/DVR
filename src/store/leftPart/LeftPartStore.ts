// MenuRSStateStore.ts
import create from 'zustand';

interface LeftPartStateProps {
    selectedStateLeftPart: boolean;
    setSelectedStateLeftPart: (collapsed: boolean) => void;
}

export const useLeftPartStateStore = create<LeftPartStateProps>((set) => ({
    selectedStateLeftPart: false,
    setSelectedStateLeftPart: (collapsed: boolean) => set({ selectedStateLeftPart: collapsed }),
}));