/*
import create from 'zustand';
import { loginRequest } from "../../api/auth/Auth";

interface AuthStore {
    isAuthenticated: boolean;
    authToken: string;
    login: (username: string, password: string) => Promise<void>;
    setAuthenticated: (isAuthenticated: boolean, authToken: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    authToken: localStorage.getItem('authToken') || '',
    login: async (username, password) => {
        try {
            const response = await loginRequest(username, password);
            if (response.success) {
                const token = response.data.token;
                localStorage.setItem('authToken', token);
                set({ isAuthenticated: true, authToken: token });
            } else {
                console.error('Authentication failed:', response.error);
            }
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    },
    setAuthenticated: (isAuthenticated, authToken) => set({ isAuthenticated, authToken })
}));*/

// /store/auth.ts
import create from 'zustand';
import { loginRequest } from "../../api/auth/Auth";
import { User } from "../../types/User";
import axios from "axios";

interface AuthStore {
    isAuthenticated: boolean;
    SmartDVRToken: string;
    logout: () => void;
    checkAuth: () => void;
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    setAuthenticated: (isAuthenticated: boolean, authToken: string, user: User) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    SmartDVRToken: localStorage.getItem('SmartDVRToken') || '',
    user: null,
    login: async (username, password) => {
        try {
            const response = await loginRequest(username, password);
            if (response.success) {
                const token = response.data.token;
                const user: User = {
                    id: response.data.id,
                    uid: response.data.uid,
                    token: response.data.token,
                    login: response.data.login,
                    password: response.data.password,
                    name: response.data.name,
                    is_admin: response.data.is_admin,
                };
                localStorage.setItem('SmartDVRToken', token);
                console.log("User info: ", user); // Debug: Log user info
                set({ isAuthenticated: true, SmartDVRToken: token, user:response.data as User });
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

    checkAuth: () => {
        const token = localStorage.getItem('SmartDVRToken');
        console.log('checkAuth: token from localStorage:', token); // Добавим лог
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            set({ isAuthenticated: true, SmartDVRToken: token });
            console.log('checkAuth: User is authenticated'); // Добавим лог
        } else {
            set({ isAuthenticated: false, SmartDVRToken: '', user: null });
            console.log('checkAuth: User is not authenticated'); // Добавим лог
        }
    },



    setAuthenticated: (isAuthenticated, SmartDVRToken, user) => set({ isAuthenticated, SmartDVRToken, user })
}));

