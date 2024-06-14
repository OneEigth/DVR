import create from 'zustand';
import { getFileDevicesFromDB } from '../../api/devices/fileDevicesFromDB';

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
    files: File[];
    hasMore: boolean;
    fetchFiles: (fileData: FileData, SmartDVRToken: string, userLogin: string, page: number, pageSize: number) => Promise<void>;
    resetFiles: () => void;
}

export const useFilesStore = create<FilesStore>((set) => ({
    files: [],
    hasMore: true, // Инициализируем hasMore
    fetchFiles: async (fileData, SmartDVRToken, userLogin, page, pageSize) => {
        if (!userLogin || !SmartDVRToken) {
            console.error('User or token information is missing.');
            return;
        }

        try {
            const response = await getFileDevicesFromDB(fileData, SmartDVRToken, userLogin, page, pageSize);
            const newFiles = response.data || [];
            set((state) => ({
                files: [...state.files, ...newFiles],
                hasMore: newFiles.length === pageSize, // Если количество загруженных файлов меньше pageSize, значит больше файлов нет
            }));
        } catch (error) {
            console.error('Error fetching files from database:', error);
            set({ hasMore: false }); // Остановить загрузку в случае ошибки
        }
    },
    resetFiles: () => set({ files: [], hasMore: true }),
}));
