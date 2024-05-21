import create from 'zustand';
import { getAdmins } from '../../api/users/admins';
import { User } from '../../types/User';
import {useAuthStore} from "../auth/auth";

interface Admins {
    users: User[];
    fetchUsers: () => Promise<void>;
}

export const useAdmins = create<Admins>((set) => ({
    users: [],
    fetchUsers: async () => {
        const { SmartDVRToken, user } = useAuthStore.getState();

        if (!user || !SmartDVRToken) {
            console.error('User or token information is missing.');
            return;
        }
        const users = await getAdmins(SmartDVRToken, user.login);
        set({ users });
    },
}));