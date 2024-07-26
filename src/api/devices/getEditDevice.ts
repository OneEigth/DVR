
import axios, {AxiosError} from 'axios';
import {POST_DEVICE_UPDATE_URL, UPDATE_LAYOUT_URL} from '../../const/const';


interface getEditDeviceData{
    UID:string
    name?: string,
    description?: string,
    groupName?: string,
    employee?: string,
    serialNumber?: string,
    model?: string,
}
export const getEditDevice = async (SmartDVRToken: string, userLogin: string, groupData:getEditDeviceData) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            POST_DEVICE_UPDATE_URL,
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
        console.error('Error edit device group:', err.response?.status, err.response?.data);
        return {success: false, error: err.response?.data || 'Unknown error'};
    }
}