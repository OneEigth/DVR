import create from 'zustand';
import { getUsers } from '../../api/users/users';
import { User } from '../../types/User';
import {useAuthStore} from "../auth/auth";

interface UserStore {
    users: User[];
    fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    users: [],
    fetchUsers: async () => {
        const { SmartDVRToken, user } = useAuthStore.getState();

        if (!user || !SmartDVRToken) {
            console.error('User or token information is missing.');
            return;
        }
        const users = await getUsers(SmartDVRToken, user.login);
        set({ users });
    },
}));