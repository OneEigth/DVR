import axios, {AxiosError } from 'axios';
import {OWNERS_API_URL} from '../../const/const';
export const getAllOwners = async (SmartDVRToken: string, userLogin: string, page:number, pageSize:number) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.get(OWNERS_API_URL(page, pageSize), {headers: {
                SmartDVRLogin: userLogin,
                SmartDVRToken: SmartDVRToken,
            },
        });
        return response.data.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error fetching owners:', err.response?.status, err.response?.data);
        return [];
    }
};