
import axios, {AxiosError} from 'axios';
import {POST_CREATE_GROUP_URL} from '../../const/const';


interface CreateGroupData{
    name:string,
    parent_uid:string
}
export const CreateGroup = async (SmartDVRToken: string, userLogin: string, groupData:CreateGroupData) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            POST_CREATE_GROUP_URL,
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
        console.error('Error create group:', err.response?.status, err.response?.data);
        return { success: false, error: err.response?.data || 'Unknown error' };
    }
};