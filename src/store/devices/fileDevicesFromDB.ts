// store/devices/fileDevicesFromDB.ts

import create from 'zustand';
import { getFileDevicesFromDB } from '../../api/devices/fileDevicesFromDB';
import {File} from "../../types/File";

interface DevicesStore {
    files: File[];
    fetchFiles: (deviceUID: string, startDateTime: string, endDateTime: string) => Promise<void>;
}


export const useDevicesStore = create<DevicesStore>((set) => ({
    files: [],
    fetchFiles: async (deviceUID, startDateTime, endDateTime) => {
        try {
            const response  = await getFileDevicesFromDB(deviceUID, startDateTime, endDateTime);
            set({ files: response.data || [] });
        } catch (error) {
            console.error('Error fetching files from database:', error);
        }
    },
}));
