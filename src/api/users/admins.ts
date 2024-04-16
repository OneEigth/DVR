import axios, {AxiosError } from 'axios';
import { ADMINS_API_URL, ADMINS_HEADERS } from '../../const/const';
export const getAdmins = async () => {
    try {
        const response = await axios.get(ADMINS_API_URL, { headers: ADMINS_HEADERS });
        return response.data.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error fetching users:', err.response?.status, err.response?.data);
        return [];
    }
};