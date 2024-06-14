import create from "zustand";

interface FileCurrentTypeState {
    fileType: string;
    setFileType: (fileType: string) => void;
}

export const useFileCurrentTypeStore = create<FileCurrentTypeState>((set) => ({
    fileType: 'all',
    setFileType: (fileType) => set({ fileType }),
}));