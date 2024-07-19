// MenuRSStateStore.ts
import create from 'zustand';

interface useMenuUsersStateStore {
    selectedStateMenuUsers: string;
    setSelectedStateMenuUsers: (uid: string) => void;
}

export const useMenuUsersState = create<useMenuUsersStateStore>((set) => ({
    selectedStateMenuUsers: '',
    setSelectedStateMenuUsers: (uid: string) => set({ selectedStateMenuUsers: uid }),
}));