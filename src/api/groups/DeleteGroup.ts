
import axios, {AxiosError} from 'axios';
import {POST_DELETE_GROUP_URL} from '../../const/const';

interface DeleteGroupData {
    uid: string;
}
export const DeleteGroup = async (SmartDVRToken: string, userLogin: string, groupData:DeleteGroupData) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            POST_DELETE_GROUP_URL,
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
        console.error('Error delete group:', err.response?.status, err.response?.data);
        return [];
    }
};