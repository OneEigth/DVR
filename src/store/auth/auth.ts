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
}));