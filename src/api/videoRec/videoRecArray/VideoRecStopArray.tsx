
import axios, {AxiosError} from 'axios';
import {VIDEO_ARRAY_RECORD_END_DEVICE_API_URL, VIDEO_RECORD_END_DEVICE_API_URL} from '../../../const/const';


interface DeviceUIDData {
    UID: string[];
}
export const VideoRecordEndArray = async (SmartDVRToken: string, userLogin: string, UID:DeviceUIDData) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            VIDEO_ARRAY_RECORD_END_DEVICE_API_URL,
            UID,
            {
                headers: {
                    SmartDVRLogin: userLogin,
                    SmartDVRToken: SmartDVRToken,
                },
            });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error videoRecordEnd device:', err.response?.status, err.response?.data);
        return;
    }
};