import create from "zustand";

import {Device} from "../../types/Device";
import {useAuthStore} from "../auth/auth";
import {getAllLayouts} from "../../api/layout/getAllLayouts";
import {LayoutType} from "../../types/LayoutType";


interface LayoutsStore {
    allLayouts: LayoutType[];
    fetchLayouts: () => Promise<void>;
}

export const useLayoutsStore = create<LayoutsStore>((set) => ({
    allLayouts: [],
    fetchLayouts: async () => {

        const { SmartDVRToken, user } = useAuthStore.getState();

        if (!user || !SmartDVRToken) {
            console.error('User or token information is missing.');
            return;
        }

        try {
            const response = await getAllLayouts(SmartDVRToken, user.login);
            const layouts = response.data || []; // Извлекаем массив устройств из ответа
            set({ allLayouts: layouts });
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    }
}));
