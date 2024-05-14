// fileStore.ts
import create from 'zustand';

interface FileStoreState {
    selectedFileUID: string;
    setSelectedFileUID: (uid: string) => void;
}

export const useFileStore = create<FileStoreState>((set) => ({
    selectedFileUID: '',
    setSelectedFileUID: (uid: string) => set({ selectedFileUID: uid }),
}));