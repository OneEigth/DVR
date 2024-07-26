

import axios, {AxiosError} from 'axios';
import {DELETE_LAYOUT_URL, GET_ALL_LAYOUTS_URL} from '../../const/const';

interface DeleteLayoutData {
    UID: string ;
}
export const DeleteLayouts = async ( SmartDVRToken: string, userLogin: string, data:DeleteLayoutData) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            DELETE_LAYOUT_URL,
            data,
            {headers: {
                    SmartDVRLogin: userLogin,
                    SmartDVRToken: SmartDVRToken,
                },
            });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error delete layout:', err.response?.status, err.response?.data);
        return;
    }
};