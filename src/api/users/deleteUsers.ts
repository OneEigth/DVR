
import axios, {AxiosError} from 'axios';
import {POST_DELETE_DEVICE_URL, POST_DELETE_GROUP_URL} from '../../const/const';
import {Device} from "../../types/Device";

interface DeleteDeviceData {
    devices: Device ;
}
export const DeleteDevice = async (SmartDVRToken: string, userLogin: string, devices:DeleteDeviceData) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            POST_DELETE_DEVICE_URL,
            devices,
            {
                headers: {
                    SmartDVRLogin: userLogin,
                    SmartDVRToken: SmartDVRToken,
                },
            });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error delete device:', err.response?.status, err.response?.data);
        return [];
    }
};