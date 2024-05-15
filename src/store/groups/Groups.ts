import create from "zustand";
import {Group} from "../../types/Group";
import {getAllGroups} from "../../api/groups/Groups";


interface GroupsStore {
    groups: Group[];
    fetchGroups: () => Promise<void>;
}

export const useGroupsStore = create<GroupsStore>((set) => ({
    groups: [],
    fetchGroups: async () => {
        try {
            const response = await getAllGroups();
            const groups = response.data || []; // Извлекаем массив устройств из ответа
            set({ groups });
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    },
}));
