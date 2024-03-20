import create from 'zustand';
import { getOperators } from '../../api/users/operators';
import { User } from '../../types/User';

interface Operators {
    users: User[];
    fetchUsers: () => Promise<void>;
}

export const useOperator = create<Operators>((set) => ({
    users: [],
    fetchUsers: async () => {
        const users = await getOperators();
        set({ users });
    },
}));