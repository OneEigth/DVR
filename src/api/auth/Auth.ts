import axios from 'axios';
import {HEADERS, LOGIN_API_URL} from '../../const/const';
export const loginRequest = async (username: string, password: string) => {
    try {
        const response = await axios.post(LOGIN_API_URL,
        {
            login: username,
            password: password
        },{ headers: HEADERS });
        return response.data;
    } catch (error) {
        console.error('Error during login request:', error);
        throw error;
    }
};