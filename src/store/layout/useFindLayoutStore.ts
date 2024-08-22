import create from "zustand";

import {useAuthStore} from "../auth/auth";
import {Layout} from "../../types/Layouts";
import {FindLayout} from "../../api/layout/findLayout";

interface FindLayoutsStore {
    FoundLayouts: Layout[];
    fetchFoundLayouts: (layoutName: string) => Promise<void>; // Добавьте layoutName как аргумент
}

export const useFindLayoutsStore = create<FindLayoutsStore>((set) => ({
    FoundLayouts: [],
    fetchFoundLayouts: async (layoutName: string) => { // Добавьте layoutName как аргумент

        const { SmartDVRToken, user } = useAuthStore.getState();

        if (!user || !SmartDVRToken) {
            console.error('User or token information is missing.');
            return;
        }

        try {
            const data = { name: layoutName }; // Создайте объект data с именем раскладки
            const response = await FindLayout(SmartDVRToken, user.login, data); // Передайте третий аргумент data
            const layouts = response || []; // Извлекаем массив раскладок из ответа
            set({ FoundLayouts: layouts });
        } catch (error) {
            console.error('Error fetching layouts:', error);
        }
    }
}));
