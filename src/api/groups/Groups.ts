
import axios, {AxiosError} from 'axios';
import {GET_GROUPS_URL, HEADERS} from '../../const/const';

export const getAllGroups = async () => {
    try {
        const response = await axios.get(GET_GROUPS_URL, { headers: HEADERS });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error fetching users:', err.response?.status, err.response?.data);
        return [];
    }
};