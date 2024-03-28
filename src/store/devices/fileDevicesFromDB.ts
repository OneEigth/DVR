// store/devices/fileDevicesFromDB.ts

import create from 'zustand';
import { getFileDevicesFromDB } from '../../api/devices/fileDevicesFromDB';

interface FileDevice {
    id: number;
    UID: string;
    deviceUID: string;
    deviceDID: string;
    name: string;
    size: number;
    start: string;
    end: string;
    duration: number;
    downloaded: boolean;
    storagePath: string;
    previewPath: string;
    tryDownloadCount: number;
    fileType: string;
}

interface DevicesStore {
    files: FileDevice[];
    fetchFiles: (deviceUID: string, startDateTime: string, endDateTime: string) => Promise<void>;
}

export const useDevicesStore = create<DevicesStore>((set) => ({
    files: [],
    fetchFiles: async (deviceUID, startDateTime, endDateTime) => {
        try {
            const data = await getFileDevicesFromDB(deviceUID, startDateTime, endDateTime);
            set({ files: data?.data?.files || [] });
        } catch (error) {
            console.error('Error fetching files from database:', error);
        }
    },
}));
