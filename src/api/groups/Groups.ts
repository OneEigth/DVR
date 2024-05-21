
import axios, {AxiosError} from 'axios';
import {GET_GROUPS_URL} from '../../const/const';

export const getAllGroups = async (SmartDVRToken: string, userLogin: string) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.get(
            GET_GROUPS_URL,
            {
                headers: {
                SmartDVRLogin: userLogin,
                SmartDVRToken: SmartDVRToken,
                },
        });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error fetching users:', err.response?.status, err.response?.data);
        return [];
    }
};