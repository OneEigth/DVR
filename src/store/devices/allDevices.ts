import create from "zustand";
import { getAllDevices } from "../../api/devices/allDevices";

interface Device {
    ID: number;
    UID: string;
    DID: string;
    pulse_time: string;
    latitude: number;
    longitude: number;
    battery_percent: string;
    ownerUID: string;
    online: boolean;
    name:string;
    description:string;
    model:string;
    groupUID:string;
}

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
