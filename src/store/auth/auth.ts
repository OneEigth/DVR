import create from 'zustand';
import {loginRequest} from "../../api/auth/Auth";


interface AuthStore {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    login: async (username, password) => {
        try {
            // Выполняем запрос на сервер для аутентификации
            const response = await loginRequest(username, password);

            // Проверяем успешную авторизацию
            if (response.success) {
                set({ isAuthenticated: true });


            } else {
                console.error('Authentication failed:', response.error);
            }
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    },
}));