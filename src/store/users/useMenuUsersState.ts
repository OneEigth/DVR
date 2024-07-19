// MenuRSStateStore.ts
import create from 'zustand';

interface MenuRSStateStore {
    selectedStateMenuRS: string;
    setSelectedStateMenuRS: (uid: string) => void;
}

export const useMenuRSStateStore = create<MenuRSStateStore>((set) => ({
    selectedStateMenuRS: '',
    setSelectedStateMenuRS: (uid: string) => set({ selectedStateMenuRS: uid }),
}));