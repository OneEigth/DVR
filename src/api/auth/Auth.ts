/*import axios from 'axios';
import { LOGIN_API_URL} from '../../const/const';
export const loginRequest = async (username: string, password: string) => {
    try {
        const response = await axios.post(LOGIN_API_URL,
        {
            login: username,
            password: password
        },);
        return response.data;
    } catch (error) {
        console.error('Error during login request:', error);
        throw error;
    }
};*/


// /api/auth.ts
import axios from 'axios';
import { LOGIN_API_URL } from '../../const/const';
import { User } from '../../types/User'

interface LoginResponse {
    success: boolean;
    data: User
    error?: string;
}

export const loginRequest = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post(LOGIN_API_URL, {
            login: username,
            password: password
        });
        return response.data;
    } catch (error) {
        console.error('Error during login request:', error);
        throw error;
    }

    console.log('loginRequest'+ Promise<LoginResponse>)

};


