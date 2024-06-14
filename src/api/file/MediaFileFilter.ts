
import axios, {AxiosError} from 'axios';
import {POST_CREATE_GROUP_URL, POST_GROUP_EDIT_DEVICE_URL} from '../../const/const';
import {Device} from "../../types/Device";


interface MediaFileData{
    device_uid:Device,
    UID:string,
}
export const getMediaFileFilter = async (SmartDVRToken: string, userLogin: string, groupData:MediaFileData) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            POST_GROUP_EDIT_DEVICE_URL,
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
        return { success: false, error: err.response?.data || 'Unknown error' };
    }
};