import create from "zustand";

interface FileFilterStore {
    fileFilterStore: {
        dateStart: string;
        dateEnd: string;
        rating: string[];

    };
    setFileFilterStore: (fileFilterStore: Partial<FileFilterStore['fileFilterStore']>) => void;
}

export const useFilterFileStore = create<FileFilterStore>((set) => ({
    fileFilterStore: {
        dateStart: "",
        dateEnd: "",
        rating: [],

    },
    setFileFilterStore: (fileFilterStore) =>
        set((state) => ({
            fileFilterStore: { ...state.fileFilterStore, ...fileFilterStore }
        })),
}));