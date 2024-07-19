
import axios, {AxiosError} from 'axios';
import {FIlE_ATTACH_API_URL} from '../../const/const';

export const upLoadFile = async (SmartDVRToken: string, userLogin: string, fileUID:string) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            FIlE_ATTACH_API_URL(fileUID),
            {
                headers: {
                    SmartDVRLogin: userLogin,
                    SmartDVRToken: SmartDVRToken,
                },
            });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error edit device group:', err.response?.status, err.response?.data);
        return { success: false, error: err.response?.data || 'Unknown error' };
    }
};