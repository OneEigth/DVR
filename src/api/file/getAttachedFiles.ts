
import axios, {AxiosError} from 'axios';
import {GET_ATTACHED_FILES_API_URL} from '../../const/const';

export const getAllAttachedFiles = async (SmartDVRToken: string, userLogin: string) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.get(
            GET_ATTACHED_FILES_API_URL,
            {
                headers: {
                    SmartDVRLogin: userLogin,
                    SmartDVRToken: SmartDVRToken,
                },
            });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error fetching Attached files:', err.response?.status, err.response?.data);
        return [];
    }
};