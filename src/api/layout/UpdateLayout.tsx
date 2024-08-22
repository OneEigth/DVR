

import axios, {AxiosError} from 'axios';
import {UPDATE_LAYOUT_URL} from '../../const/const';
import {Device} from "../../types/Device";

interface UpdateLayoutData {
    uid?:string,
    name?: string,
    userUID?: string,
    userName?: string,
    viewType?: string,
    devices?: { UID: string }[];
}
export const UpdateLayouts = async ( SmartDVRToken: string, userLogin: string, data:UpdateLayoutData) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            UPDATE_LAYOUT_URL,
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