import create from "zustand";
import { getAllDevices } from "../../api/devices/allDevices";
import {Device} from "../../types/Device";
import {useAuthStore} from "../auth/auth";


interface DevicesStore {
    devices: Device[];
    fetchDevices: () => Promise<void>;
}

export const useDevicesStore = create<DevicesStore>((set) => ({
    devices: [],
    fetchDevices: async () => {

        const { SmartDVRToken, user } = useAuthStore.getState();

        if (!user || !SmartDVRToken) {
            console.error('User or token information is missing.');
            return;
        }

        try {
            const response = await getAllDevices(SmartDVRToken, user.login);
            const devices = response.data || []; // Извлекаем массив устройств из ответа
            set({ devices});
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    }
}));
