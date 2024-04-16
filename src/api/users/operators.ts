import axios, { AxiosError } from 'axios';
import { OPERATORS_API_URL, OPERATORS_HEADERS } from '../../const/const';
export const getOperators = async () => {
    try {
        const response = await axios.get(OPERATORS_API_URL, { headers: OPERATORS_HEADERS });
        return response.data.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error fetching users:', err.response?.status, err.response?.data);
        return [];
    }
};
