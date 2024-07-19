
import axios, {AxiosError} from 'axios';
import {DELETE_OWNER_API_URL} from '../../const/const';


interface DeleteOwnerData{
    deviceUID: string,
}

export const deleteOwner = async (SmartDVRToken: string, userLogin: string, ownerData:DeleteOwnerData) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            DELETE_OWNER_API_URL,
            ownerData,
            {
                headers: {
                    SmartDVRLogin: userLogin,
                    SmartDVRToken: SmartDVRToken,
                },
            });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error create device:', err.response?.status, err.response?.data);
        return { success: false, error: err.response?.data || 'Unknown error' };
    }
};