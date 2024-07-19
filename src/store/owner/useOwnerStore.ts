import create from "zustand";

import {useAuthStore} from "../auth/auth";
import {Owner} from "../../types/Owner";
import {getAllOwners} from "../../api/owners/getAllOwners";


interface OwnerStore {
    owners: Owner[];
    fetchOwners: (page: number, pageSize: number) => Promise<void>;
}

export const useOwnerStore = create<OwnerStore>((set) => ({
    owners: [],
    fetchOwners: async (page: number, pageSize: number) => {
        const { SmartDVRToken, user } = useAuthStore.getState();
        if (!user || !SmartDVRToken) {
            console.error('User or token information is missing.');
            return;
        }
        try {
            const response = await getAllOwners(SmartDVRToken, user.login,page,pageSize);
            const owners = response || []; // Извлекаем массив владельцев из ответа
            set({ owners });
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    },
}));
