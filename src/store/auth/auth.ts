// /store/auth.ts
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { loginRequest } from "../../api/auth/Auth";
import { User } from "../../types/User";
import axios from "axios";

interface AuthStore {
    isAuthenticated: boolean;
    SmartDVRToken: string;
    logout: () => void;
    /*checkAuth: () => void;*/
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    setAuthenticated: (isAuthenticated: boolean, authToken: string, user: User) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            SmartDVRToken: '',
            user: null,
            login: async (username, password) => {
                try {
                    const response = await loginRequest(username, password);
                    if (response.success) {
                        const token = response.data.token;
                        const user = response.data as User;
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        set({ isAuthenticated: true, SmartDVRToken: token, user });
                    } else {
                        console.error('Authentication failed:', response.error);
                    }
                } catch (error) {
                    console.error('Error during authentication:', error);
                }
            },

            logout: () => {
                localStorage.removeItem('SmartDVRToken');
                delete axios.defaults.headers.common['Authorization'];
                set({ isAuthenticated: false, SmartDVRToken: '', user: null });
            },

            /*checkAuth: () => {
                const token = localStorage.getItem('SmartDVRToken');
                const user = JSON.parse(localStorage.getItem('user') || 'null');
                if (token && user) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    set({ isAuthenticated: true, SmartDVRToken: token, user });
                } else {
                    set({ isAuthenticated: false, SmartDVRToken: '', user: null });
                }
            },*/

            setAuthenticated: (isAuthenticated, SmartDVRToken, user) => set({ isAuthenticated, SmartDVRToken, user })
        }),
        {
            name: 'auth-storage', // имя ключа в локальном хранилище
            getStorage: () => localStorage, // используйте локальное хранилище
        }
    )
);
