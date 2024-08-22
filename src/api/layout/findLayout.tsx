

import axios, {AxiosError} from 'axios';
import {FIND_LAYOUT_URL} from '../../const/const';

interface FindLayoutData{
    name: string,

}
export const FindLayout = async ( SmartDVRToken: string, userLogin: string, data:FindLayoutData) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            FIND_LAYOUT_URL,
            data,
            {headers: {
                    SmartDVRLogin: userLogin,
                    SmartDVRToken: SmartDVRToken,
                },
            });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error find layout:', err.response?.status, err.response?.data);
        return { success: false, error: err.response?.data || 'Unknown error' };
    }
};