

import axios, {AxiosError} from 'axios';
import {CREATE_LAYOUT_URL, GET_ALL_LAYOUTS_URL} from '../../const/const';

interface CreateLayoutData{
    name: string,
    userUID: string,
    viewType: string,
    devices: string[]
}
export const CreateLayout = async ( SmartDVRToken: string, userLogin: string, data:CreateLayoutData) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            CREATE_LAYOUT_URL,
            data,
            {headers: {
                    SmartDVRLogin: userLogin,
                    SmartDVRToken: SmartDVRToken,
                },
            });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error create layout:', err.response?.status, err.response?.data);
        return { success: false, error: err.response?.data || 'Unknown error' };
    }
};