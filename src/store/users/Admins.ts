import create from 'zustand';
import { getAdmins } from '../../api/users/admins';
import { User } from '../../types/User';

interface Admins {
    users: User[];
    fetchUsers: () => Promise<void>;
}

export const useAdmins = create<Admins>((set) => ({
    users: [],
    fetchUsers: async () => {
        const users = await getAdmins();
        set({ users });
    },
}));