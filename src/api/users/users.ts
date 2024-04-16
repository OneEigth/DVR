import axios, { AxiosError } from 'axios';
import { USERS_API_URL, USERS_HEADERS } from '../../const/const';
export const getUsers = async () => {
    try {
        const response = await axios.get(USERS_API_URL, { headers: USERS_HEADERS });
        return response.data.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error fetching users:', err.response?.status, err.response?.data);
        return [];
    }
};
