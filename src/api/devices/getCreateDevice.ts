
import axios, {AxiosError} from 'axios';
import {POST_CREATE_DEVICE_URL, POST_CREATE_GROUP_URL} from '../../const/const';


interface CreateDeviceData{
    name:string,
    DID:string,
    model:string,
    description:string,
    groupUID:string,
    owner:string
}
export const getCreateDevice = async (SmartDVRToken: string, userLogin: string, groupData:CreateDeviceData) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            POST_CREATE_DEVICE_URL,
            groupData,
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