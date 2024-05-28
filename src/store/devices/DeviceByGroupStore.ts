import create from "zustand";

import {Device} from "../../types/Device";
import {getDeviceByGroup} from "../../api/devices/getDeviceByGroup";


interface DevicesStore {
    devicesByStore: Device[];
    fetchDevicesByStore: (groupUID: string,SmartDVRToken:string, userLogin:string ) => Promise<void>;
}

export const DeviceByGroupStore = create<DevicesStore>((set) => ({
    devicesByStore: [],
    fetchDevicesByStore: async (groupUID, SmartDVRToken, userLogin) => {
        if (!userLogin || !SmartDVRToken) {
            console.error('User information is missing.');
            return;
        }

        try {
            const response = await getDeviceByGroup(SmartDVRToken, userLogin, groupUID);
            const devicesByStore = response.data || [];
            set({ devicesByStore });
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    }
}));
