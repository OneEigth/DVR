import create from 'zustand';
import { getUsers } from '../../api/users/users';
import { User } from '../../types/User';

interface UserStore {
    users: User[];
    fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    users: [],
    fetchUsers: async () => {
        const users = await getUsers();
        set({ users });
    },
}));