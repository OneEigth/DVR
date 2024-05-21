import create from "zustand";

interface SelectedFilesState {
    selectedFiles: File[]; // Здесь нужно определить тип выбранных файлов
    setSelectedFiles: (selectedFiles: any[]) => void;
}

export const useSelectedFilesStore = create<SelectedFilesState>((set) => ({
    selectedFiles: [],
    setSelectedFiles: (selectedFiles) => set({ selectedFiles }),
}));