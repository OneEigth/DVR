import create from 'zustand';
import { useAuthStore } from '../auth/auth';
import { createPTTGroup, deletePTTGroup, fetchPTTGroups, updatePTTGroup } from '../../api/pttGroups/fetchPttGroup';
import { PTTGroup } from '../../types/PTTGroup';

// Zustand хранилище
interface PTTGroupsStore {
    groups: PTTGroup[];
    fetchGroups: () => Promise<void>;
    addGroup: (group: PTTGroup, devices: { UID: string }[]) => Promise<{ success: boolean; error?: string }>;
    updateGroup: (group: { uid: string; name?: string; devices?: { UID: string }[] }) => Promise<void>;
    removeGroup: (groupId: string) => Promise<void>;
}

export const usePTTGroupsStore = create<PTTGroupsStore>((set, get) => ({
    groups: [],

    fetchGroups: async () => {
        const { SmartDVRToken, user } = useAuthStore.getState();

        if (!user || !SmartDVRToken) {
            console.error('User or token information is missing.');
            return;
        }

        try {
            const groups = await fetchPTTGroups(SmartDVRToken, user.login);

            // Проверяем, что данные являются массивом
            if (!Array.isArray(groups)) {
                console.error('Fetched groups is not an array:', groups);
                set({ groups: [] }); // Если не массив, записываем пустой массив
                return;
            }

            set({ groups }); // Если массив, записываем данные в Zustand
        } catch (error) {
            console.error('Error fetching PTT groups:', error);
            set({ groups: [] }); // Обрабатываем ошибку и устанавливаем пустой массив
        }
    },

    addGroup: async (group, devices): Promise<{ success: boolean; error?: string }> => {
        const { SmartDVRToken, user } = useAuthStore.getState();
        if (!user || !SmartDVRToken) {
            console.error('User or token information is missing.');
            return { success: false, error: "Ошибка аутентификации" };
        }
        if (devices.length < 1) {
            console.error('At least one device must be provided.');
            return { success: false, error: "Выберите хотя бы одно устройство!" };
        }
        try {
            const payload = {
                name: group.name,
                userUID: user.uid,
                devices,
            };
            // Отправляем запрос и получаем ответ
            const response = await createPTTGroup(SmartDVRToken, user.login, payload);
            console.log("Ответ сервера:", response);

            // Проверяем, если сервер вернул корректный объект
            if (!response || typeof response !== "object") {
                return { success: false, error: "Некорректный ответ от сервера" };
            }

            await get().fetchGroups(); // Обновляем список групп

            return response; // Возвращаем ответ сервера
        } catch (error) {
            console.error("Error adding PTT group:", error);
            return { success: false, error: "Ошибка при создании группы" };
        }
    },

    updateGroup: async ({ uid, name, devices }) => {
        const { SmartDVRToken, user } = useAuthStore.getState();
        if (!user || !SmartDVRToken) {
            console.error('User or token information is missing.');
            return;
        }
        if (devices && devices.length < 1) {
            console.error('At least one device must remain in the group.');
            return;
        }
        try {
            const payload = {
                uid,
                name,
                devices,
            };
            await updatePTTGroup(SmartDVRToken, user.login, payload);
            await get().fetchGroups();
        } catch (error) {
            console.error('Error updating PTT group:', error);
        }
    },

    removeGroup: async (groupUID) => {
        const { SmartDVRToken, user } = useAuthStore.getState();
        if (!user || !SmartDVRToken) {
            console.error('User or token information is missing.');
            return;
        }
        try {
            await deletePTTGroup(SmartDVRToken, user.login, groupUID);
            await get().fetchGroups();
        } catch (error) {
            console.error('Error deleting PTT group:', error);
        }
    },
}));
