import create from 'zustand';
import { getFilterFileDevicesFromDB } from '../../api/file/FilterfileDevicesFromDB';

interface File {
    ID: string;
    UID: string;
    fileType: string;
}

interface FileData {
    deviceUID: string;
    start: string;
    end: string;
    rating?: number[];
}

interface FilesStore {
    filter_files: File[];
    filter_hasMore: boolean;
    filter_fetchFiles: (fileData: FileData, SmartDVRToken: string, userLogin: string, page: number, pageSize: number) => Promise<void>;
    filter_resetFiles: () => void;
}

export const useFilterFilesStore = create<FilesStore>((set) => ({
    filter_files: [],
    filter_hasMore: true, // Инициализируем hasMore
    filter_fetchFiles: async (fileData, SmartDVRToken, userLogin, page, pageSize) => {
        if (!userLogin || !SmartDVRToken) {
            console.error('User or token information is missing.');
            return;
        }

        try {
            const response = await getFilterFileDevicesFromDB(fileData, SmartDVRToken, userLogin, page, pageSize);
            const newFiles = response.data || [];
            set((state) => ({
                filter_files: [...state.filter_files, ...newFiles],
                filter_hasMore: newFiles.length === pageSize, // Если количество загруженных файлов меньше pageSize, значит больше файлов нет
            }));
        } catch (error) {
            console.error('Error fetching files from database:', error);
            set({ filter_hasMore: false }); // Остановить загрузку в случае ошибки
        }
    },
    filter_resetFiles: () => set({ filter_files: [], filter_hasMore: true }),
}));
