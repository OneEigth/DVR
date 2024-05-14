import create from "zustand";
import { getAllDevices } from "../../api/devices/allDevices";
import {Device} from "../../types/Device";


interface DevicesStore {
    devices: Device[];
    fetchDevices: () => Promise<void>;
}

export const useDevicesStore = create<DevicesStore>((set) => ({
    devices: [],
    fetchDevices: async () => {
        try {
            const response = await getAllDevices();
            const devices = response.data || []; // Извлекаем массив устройств из ответа
            set({ devices });
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    },
}));
