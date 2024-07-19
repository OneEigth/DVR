
import axios, {AxiosError} from 'axios';
import {
    GET_ATTACHED_FILES_BY_MEDIA_FILE_UID_API_URL
} from '../../const/const';




export const getAttachedFilesByMediaFile = async (SmartDVRToken: string, userLogin: string, uid:string) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.get(
            GET_ATTACHED_FILES_BY_MEDIA_FILE_UID_API_URL(uid),
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