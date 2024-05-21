import create from 'zustand';
import { getOperators } from '../../api/users/operators';
import { User } from '../../types/User';
import {useAuthStore} from "../auth/auth";

interface Operators {
    users: User[];
    fetchUsers: () => Promise<void>;
}

export const useOperator = create<Operators>((set) => ({
    users: [],
    fetchUsers: async () => {
        const { SmartDVRToken, user } = useAuthStore.getState();

        if (!user || !SmartDVRToken) {
            console.error('User or token information is missing.');
            return;
        }
        const users = await getOperators(SmartDVRToken, user.login);
        set({ users });
    },
}));