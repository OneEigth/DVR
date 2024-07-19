import create from "zustand";
import {Group} from "../../types/Group";
import {getAllGroups} from "../../api/groups/AllGroups";
import {useAuthStore} from "../auth/auth";


interface GroupsStore {
    groups: Group[];
    fetchGroups: () => Promise<void>;
}

export const useGroupsStore = create<GroupsStore>((set) => ({
    groups: [],
    fetchGroups: async () => {
        const { SmartDVRToken, user } = useAuthStore.getState();
        if (!user || !SmartDVRToken) {
            console.error('User or token information is missing.');
            return;
        }
        try {
            const response = await getAllGroups(SmartDVRToken, user.login);
            const groups = response.data || []; // Извлекаем массив устройств из ответа
            set({ groups });
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    },
}));
