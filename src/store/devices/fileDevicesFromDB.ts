import create from 'zustand';
import { getFileDevicesFromDB } from '../../api/devices/fileDevicesFromDB';
import { useAuthStore } from "../../store/auth/auth";
import { File } from "../../types/File";

interface FilesStore {
    files: File[];
    fetchFiles: (deviceUID: string, startDateTime: string, endDateTime: string) => Promise<void>;
}

export const useFilesStore = create<FilesStore>((set) => ({
    files: [],
    fetchFiles: async (deviceUID, startDateTime, endDateTime) => {
        const { SmartDVRToken, user } = useAuthStore.getState();

        if (!user || !SmartDVRToken) {
            console.error('User or token information is missing.');
            return;
        }

        try {
            const response = await getFileDevicesFromDB(deviceUID, startDateTime, endDateTime, SmartDVRToken, user.login);
            set({ files: response.data || [] });
        } catch (error) {
            console.error('Error fetching files from database:', error);
        }
    },
}));