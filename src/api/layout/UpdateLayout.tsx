

import axios, {AxiosError} from 'axios';
import {GET_ALL_LAYOUTS_URL} from '../../const/const';

interface DeleteLayoutData {
    UID: string ;
}
export const UpdateLayouts = async ( SmartDVRToken: string, userLogin: string, data:DeleteLayoutData) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            GET_ALL_LAYOUTS_URL,
            data,
            {headers: {
                    SmartDVRLogin: userLogin,
                    SmartDVRToken: SmartDVRToken,
                },
            });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error edit layout:', err.response?.status, err.response?.data);
        return { success: false, error: err.response?.data || 'Unknown error' };
    }
};