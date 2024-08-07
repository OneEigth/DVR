import axios, {AxiosError } from 'axios';
import {OWNERS_BY_UID_OR_DEVICE_UID_API_URL} from '../../const/const';


export const getOwnersByUIDAndDeviceUID = async (SmartDVRToken: string, userLogin: string) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.get(OWNERS_BY_UID_OR_DEVICE_UID_API_URL,
            {headers: {
                SmartDVRLogin: userLogin,
                SmartDVRToken: SmartDVRToken,
            },
        });
        return response.data.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error fetching users:', err.response?.status, err.response?.data);
        return [];
    }
};