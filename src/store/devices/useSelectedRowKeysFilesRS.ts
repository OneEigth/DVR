import create from 'zustand';

interface FileSelectionState {
    selectedFiles: { [key: string]: boolean };
    setSelectedFiles: (fileId: string, isChecked: boolean) => void;
    clearSelectedFiles: () => void;
}

export const useFileSelectionStore = create<FileSelectionState>((set) => ({
    selectedFiles: {},
    setSelectedFiles: (fileId, isChecked) =>
        set((state) => {
            // Проверяем, есть ли уже fileId в массиве selectedFiles
            const isSelected = state.selectedFiles[fileId];

            // Если файл уже выбран и пользователь снимает выбор, то удаляем его из массива
            if (isSelected && !isChecked) {
                // Создаем копию предыдущего состояния selectedFiles
                const updatedFiles = { ...state.selectedFiles };
                // Удаляем fileId из копии
                delete updatedFiles[fileId];
                // Возвращаем обновленный объект
                return { selectedFiles: updatedFiles };
            } else if (!isSelected && isChecked) {
                // Если файл не был выбран, но теперь выбран, добавляем его в массив
                return { selectedFiles: { ...state.selectedFiles, [fileId]: true } };
            } else {
                // Если состояние не изменилось, возвращаем прежний объект
                return state;
            }
        }),
    clearSelectedFiles: () => set({ selectedFiles: {} }),
}));
