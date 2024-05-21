

import axios, {AxiosError} from 'axios';
import { API_URL, HEADERS } from '../../const/const';



export const getAllDevices = async () => {
    try {
        const response = await axios.get(API_URL, { headers: HEADERS });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error fetching users:', err.response?.status, err.response?.data);
        return [];
    }
};