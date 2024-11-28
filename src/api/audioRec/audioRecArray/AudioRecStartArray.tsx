
import axios, {AxiosError} from 'axios';
import {AUDIO_ARRAY_RECORD_START_DEVICE_API_URL} from '../../../const/const';


interface DeviceUIDData {
    UID: string[];
}
export const AudioRecStartArray = async (SmartDVRToken: string, userLogin: string, UID:DeviceUIDData) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            AUDIO_ARRAY_RECORD_START_DEVICE_API_URL,
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
        console.error('Error audioRecordStart device:', err.response?.status, err.response?.data);
        return;
    }
};