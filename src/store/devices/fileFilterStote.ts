import create from "zustand";

interface fileFilterStore {
    fileFilterStore: object;
    setFileFilterStore: (selectedFiles: any) => void;
}

export const useFilterFileStore = create<fileFilterStore>((set) => ({
    fileFilterStore: [],
    setFileFilterStore: (fileFilterStore) => set({ fileFilterStore }),
}));